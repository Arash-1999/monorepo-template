# Route Guard

### Usage
dependencies:
    - `@lib/loading` (it's peer-dep)

1. create your config types and objects:

    - `TStore` should extends `Record<string, any>`
    - return type of each guard function should match with your `TStore` type.
    - you can access result of dependency of each guard in `fn` arguments.
    - it supports two type of guards `can-activate` and `can-activate-child`.

```typescript
import type { GuardConfig, RoutesConfig } from "@lib/guard/types";

interface TStore {
    "auth": string;
    "admin": boolean;
}

const guards: GaurdConfig<TStore> = {
    "auth": {
        name: "auth",
        fallback: "/login",
        fn: async () => {
            // your authentication/authorization logic(e.g. reading from local storage)
        },
    },
    "admin": {
        name: "admin",
        fallback: "/login/admin",
        fn: async ({ auth }) => {
            // check user access
        },
        deps: ["auth"],
    },
};
const routes: RoutesConfig<TStore> = {
    "/dashboard": {
        "can-activate-child": ["auth"],
    },
    "/dashboard/profile/edit": {
        "can-activate": ["admin"],
    },
};
```

2. create new instance of `GuardCreator` class:

```typescript
import GuardCreator from "@lib/guard";
import { loading } from "path/to/your/laoding/instance";
import type { Mode } from "@lib/loading";

const RouteGuard = new GuardCreator<TStore>(
  routes,
  (status) => {
    loading.dispatchLoading(status ? Mode.true : Mode.false, "ROUTE_GUARD", "GLOBAL_LOADING");
  },
  guardConfig,
);
```

3. use `context` and `provider` for integrating with your project

```typescript
import { useContext } from "react";

const RouteGuardProvider = RouteGuard.provider();
const useGuard = () => {
    return useContext(RouteGuard.context);
};
```

4. use provider in root/layout of your project

```typescript
import type { ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { RouteGuardProvider } from "path/to/your/guard/instance";

type Props = {
    children: ReactNode;
};

const Layout = ({children}: Props) => {
    // you can use any library/framework for navigation (e.g. next router, react-router, ...)
    const pathname = usePathname();
    const router = useRouter();

    return (
        <RouteGuardProvider
            pathname={pathname}
            navigate={router.push}
        >
            {children}
        </RouteGuardProvider>
    );
};

export default Layout;
```
