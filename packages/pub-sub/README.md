# pub-sub

implementation of Observer(Publish-Subscribe) design pattern.

Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

### Usage

1. create and extended class of SubjectBase for your application.

```ts
class Store extends SubjectBase<StateType> {
  constructor(defaultValue: StateType) {
    super(defaultValue);
  }

  action(s: State) {
    // set your state and call notify method to update observers
    this.state = s;
    this.notify();
  }
}
```

2. create instance of your Subject

```ts
const store = new Store(defaultValue);
```

3. attach you component to your store

```ts
const Comp = () => {
  const [state, setState] = React.useState<State>(stateDefaultValue);

  const observer = React.useMemo(() => {
    return new Observer<State>(setState, "your-component-id");
  }, []);

  React.useEffect(() => {
    store.attach(observer);

    return () => {
      store.detach(observer);
    };
  }, [observer]);

  return <>{/* some jsx */}</>;
};
```

4. create wrapper for your action method in Subject class

```ts
const dispatchAction = ({ state, ...rest }) => {
  // it's to you to do anything with `rest`
  store.action(state);
};
```

5. use your wrapper function where you want or need.

```ts
const AnotherComponent = () => {
    return (
        <div>
            <>{/* some jsx*/}</>
            <button onClick={() => dispatchAction({state: "your new state value")}></button>
        </div>
    );
}
```
