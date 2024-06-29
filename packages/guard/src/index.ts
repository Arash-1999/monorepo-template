import type { Context } from "react";
import { createContext } from "react";
import type {
  GuardConfig,
  GuardContextValue,
  GuardCreatorClass,
  RoutesConfig,
  DataDefault,
  NavigateFunction,
  GuardConfigInternal,
  Entries,
  SetLoadingFn,
} from "./types";
import Provider from "./provider";

class GuardCreator<TStore extends DataDefault> implements GuardCreatorClass<TStore> {
  public context: Context<GuardContextValue<TStore>>;
  private config: GuardConfigInternal<TStore>;

  constructor(
    private routes: RoutesConfig<TStore>,
    private setLoading: SetLoadingFn,
    config: GuardConfig<TStore>,
  ) {
    this.config = this.parseConfig(config);
    this.context = createContext<GuardContextValue<TStore>>({
      data: {},
      checkAccess: async () => false,
    });
  }

  private parseConfig(config: GuardConfig<TStore>) {
    const result = (
      Object.entries(config) as Entries<GuardConfigInternal<TStore>>
    ).map((el) => {
      el[1]["canResolve"] = [];
      return el;
    }).reduce<Partial<GuardConfigInternal<TStore>>>((acc, cur) => {
      const key = cur[0] as keyof TStore;
      acc[key] = cur[1];
      return acc;
    }, {}) as GuardConfigInternal<TStore>;

    return result;
  }

  private resolveHandler(value: TStore[keyof TStore]) {
    return {
      status: "fulfilled",
      value,
    } as const;
  }
  // PERF: create reason enum types for better fallback handling
  private rejectHandler(reason: string) {
    return {
      status: "rejected",
      reason,
    } as const;
  };

  private configDFS(list: (keyof TStore)[]): Set<keyof TStore> {
    const stack = [...list];
    const visited: Set<keyof TStore> = new Set();

    while (stack.length > 0) {
      const cur = stack.shift() as keyof TStore;

      if (!visited.has(cur)) {
        visited.add(cur);
        this.config[cur].deps?.forEach((dep) => {
          if (!visited.has(dep)) {
            stack.push(dep);
          }
        });
      }
    }

    return visited;
  }

  private getRouteGuards(pathname: string) {
    let list: (keyof TStore)[] = [];

    if (this.routes[pathname]) {
      list = [
        ...(this.routes[pathname]?.["can-activate"] || []),
        ...(this.routes[pathname]?.["can-activate-child"] || []),
      ];
    }
    let guardSet: Set<keyof TStore> = new Set(list);
    const d = pathname.split("/");

    for (let i = 0, len = d.length; i < len; i++) {
      let subpath = `${d.slice(0, i + 1).join("/")}`;
      if (subpath === "") {
        subpath = "/";
      }
      if (this.routes[subpath]) {
        (this.routes[subpath]?.["can-activate-child"] || []).forEach((item) => {
          guardSet.add(item);
        });
      }
    }

    const result = Array.from(guardSet);
    result.sort();
    return result.join(", ");
  }

  public provider() {
    return Provider({
      Context: this.context,
      getRouteGuards: (pathname: string) => this.getRouteGuards(pathname),
      setLoading: (status) => {
        this.setLoading(status, ["GLOBAL_LOADING"]);
      },
      checkAccess: (navigate: NavigateFunction, pathname: string, store: Partial<TStore>) => {
        return this.checkAccess(pathname, navigate, store, );
      }
    });
  }

  private async checkAccess(
    route: string,
    navigate: NavigateFunction,
    store: Partial<TStore>,
  ) {
    const cache: Partial<TStore> = {...store};
    const guardString = this.getRouteGuards(route);
    const list = guardString.length === 0 ? [] : guardString.split(", ");

    if (list.length === 0 || list.every((item) => item in cache))
      return cache;
    
    const v = this.configDFS(list);
    let queue: (keyof TStore)[] = [];

    v.forEach((el) => {
      if (typeof this.config[el].deps === "undefined" || this.config[el].deps?.length === 0) {
        queue.push(el);
      }
    });

    while (queue.length > 0) {
      const res = await Promise.all(
        queue
          .filter(g => !(g in cache))
          .map(g => {
            return Promise.resolve(
              this.config[g].fn(cache).then(this.resolveHandler, this.rejectHandler)
            );
          })
      );

      const _queue: (keyof TStore)[] = [...queue];
      queue = []

      for (let i = 0, len = _queue.length; i < len; i++) {
        const guardKey = _queue[i] as keyof TStore;
        const guardResult = res[i];

        if (guardResult) {
          if (guardResult.status === "fulfilled") {
            cache[guardKey] = guardResult.value;
            this.config[guardKey].canResolve?.forEach((target) => {
              if (
                v.has(target) &&
                !(target in cache) &&
                this.config[target].deps?.every(j => j in cache)
              ) {
                queue.push(target);
              }
            });
          } else {
            const fallback = this.config[guardKey].fallback;

            if(fallback.type === "redirect") {
              navigate(fallback.to);
            }else if (fallback.type === "function") {
              fallback.fn();
              this.setLoading(false, ["GLOBAL_LOADING"]);
            }else if (fallback.type === "function-async") {
              await fallback.fn();
              this.setLoading(false, ["GLOBAL_LOADING"]);
            }

            return Promise.reject();
          }
        }
      }
    }

    return cache;
  }
}

export default GuardCreator;
