import { SubjectBase } from "@core/pub-sub";

export type LoadingState = Map<string, Set<string>>;
export type LoadingAction = (state: LoadingState) => void;
export const enum Mode {
  false = 0,
  true = 1,
  toggle = 2,
  forceFalse = 3,
}

const defaultState = new Map<string, Set<string>>();

class LoadingSubject extends SubjectBase<
  LoadingState,
  LoadingAction
> {
  constructor(defaultValue: LoadingState = defaultState) {
    super(defaultValue);
  }

  action (mode: Mode, sender: string, ...ids: string[]) {
    const notifyList = [];

    for (let i = 0, len = ids.length; i < len; i++) {
      const id = ids[i] || "";
      if(this.checkAttach(id)) {
        const prev = this.state.get(id);
        let cur = new Set(prev);

        switch (mode) {
          case Mode.false:
            cur.delete(sender);
            break;
          case Mode.true:
            cur.add(sender);
            break;
          case Mode.toggle:
            cur[cur.has(sender) ? "delete" : "add"](sender);
            break;
          case Mode.forceFalse:
            cur.delete(sender);
            cur.clear();
            break;
        }

        if(prev?.size || 0 !== cur.size) {
          this.state.set(id, cur);
          notifyList.push(id);
        }
      }
    }

    this.notify(...notifyList);
  }
}

export { LoadingSubject };
