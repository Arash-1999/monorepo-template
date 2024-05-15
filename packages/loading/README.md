# General Loading

simple and lightweight loading handler for react projects

### Usage:

1. create new instance of `Loading` class:
```typescript
import { Loading } from "@lib/loading";

const loading = new Loading();

exportd { loading };
```

2. create your desired component with loading functionality like this:

```typescript
type Props = {
    loading: boolean;
};

const Comp = ({ loading }: Props) => {
    // return something depend on loading state
    return (
        <button>
            {loaidng ? "loading..." : "submit"}
        </button>
    )
}
```

3. pass your component to `withLoading` HOC:

```typescript
import { loading as loadingClass } from "your/path/to/loading";

const WithLoadingComponent = loadingClass.withLoading(Comp);
```

it adds `name` to component props and remove `loading` property.
name is your component id for setting loading state.
other properties doesn't changed.

3. now you can use `WithLoadingComponent` every where you want like this:

```typescript
const SomeComponent = () => {
    return (
        <>
            {/* some code... */}
            <WithLoadingComponent name="component-id-1" />
            {/* some code... */}
        </>
    );
};
```

4. for changing loading state use `dispatchLoading` function:

```typescript
const AnotherComponent = () => {
    return (
        <>
            {/* some code... */}
            <button
                onClick={() => {
                    dispatchLoading(Mode.true, "sender-1", "component-id-1");
                }}
            >
                enable loading
            </button>
            {/* some code... */}
        </>
    );
};
```

or you can change loading of multiple componets by passing multiple ids
```typescript
dispatchLoading(Mode.false, "sender-1", "component-id-1", "component-id-2", "component-id-3");
```

### `dispatchLoading` parameteres:

1. `Mode` Enum

You can change loaidng in 3 different modes: true/false/toggle

```typescript
dispatchLoading(Mode.true, "sender-1", "component-id-1");
dispatchLoading(Mode.false, "sender-1", "component-id-1");
dispatchLoading(Mode.toggle, "sender-1", "component-id-1");
dispatchLoading(Mode.forceFalse, "sender-1", "component-id-1");
```

2. Sender id

Unique name for your compnent that want change loading status of other components to prevent race conditions.

```typescript
dispatchLoading(Mode.true, "sender-1", "component-id-1");
dispatchLoading(Mode.true, "sender-2", "component-id-1");

setTimeout(() => {
    dispatchLoading(Mode.false, "sender-1", "component-id-1");
}, 1500);

settimeout(() => {
    dispatchLoading(Mode.false, "sender-2", "component-id-1");
}, 3000);
```

If you want to override default behavior for multiple ids you can use `Mode.forceFalse`


3. target id/ids

component id/ids you want change loading status.

```typescript
dispatchLoading(Mode.true, "sender-1", "component-id-1");

const arr = ["component-id-1", "component-id-2"];
dispatchLoading(Mode.true, "sender-2", ...arr);
```

