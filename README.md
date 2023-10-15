# [useClassState](https://github.com/grayaustinc/use-class-state)

**use-class-state** is a React library that makes managing complex component states easier.

## Installation

**Install via npm or yarn:**

- Using npm:

```bash
npm install use-class-state
```

- Using yarn:

```bash
yarn add use-class-state
```

## Documentation

### useClassState

- **Description:** **_useClassState_** is a custom React hook that simplifies the creation and management of class-based state objects in your components.
- **Parameters:**
  - **State** (Type: Class constructor) - The class constructor function that extends **_ClassState_**
  - **args** (Type: Array) - An array of arguments to be passed to the class constructor.
- **Returns:** A function that returns the instance of the provided class.
- **Usage:**

```javascript
const MyComponent = () => {
  const myState = useClassState(MyState, [initialArg1, initialArg2]);

  // Use myState as your class-based state
  // ...
};
```

### updateClassState

- **Description:** **_updateClassState_** is a function for triggering state updates on instances of classes derived from **_ClassState_**. Use it to initiate updates on class-based states.
- **Parameters:**
  - **state** (Type: Class instance) - An instance of a class derived from **_ClassState_**.
- **Usage:**

```javascript
const myState = useClassState(MyState, [initialArg1, initialArg2]);
updateClassState(myState);
```

### ClassState

- **Description:** **_ClassState_** is a base class that simplifies class-based state management in React components. You can extend this class to create custom class-based state objects for your components.
- **Usage:**

```javascript
class MyState extends ClassState {
  // Define your state properties and methods here
}
```

## Examples

### Simple Counter State

This example showcases how to use "use-class-state" to manage a counter in a React component, allowing you to increment and decrement the count with class-based state objects.

```tsx
import useClassState, { ClassState, updateClassState } from "use-class-state";

class AppState extends ClassState {
  private counter = 0;

  public GetCount() {
    return this.counter;
  }

  public OnIncrement: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    this.counter += 1;
    updateClassState(this);
  };

  public OnDecrement: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    this.counter -= 1;
    updateClassState(this);
  };
}

export default function App() {
  const state = useClassState(AppState, []);

  return (
    <main>
      <div>{state().GetCount()}</div>
      <button onClick={state().OnIncrement}>Increment</button>
      <button onClick={state().OnDecrement}>Decrement</button>
    </main>
  );
}
```

### Simple List State

This example showcases a React list management application using "use-class-state," where you can add and remove items dynamically with a list of numbers, each featuring a "Remove" button.

```tsx
import { FC } from "react";
import useClassState, { ClassState, updateClassState } from "use-class-state";

class ListState extends ClassState {
  public list: Array<number> = [];

  public AddItem(item: number) {
    this.list.push(item);
    updateClassState(this);
  }

  public AddItemClicked: React.MouseEventHandler<HTMLButtonElement> = () => {
    const item = Math.round(Math.random() * 10_000);
    this.AddItem(item);
  };

  public RemoveItem(index: number) {
    this.list.splice(index, 1);
    updateClassState(this);
  }

  public RemoveItemClicked(index: number) {
    const OnClick: React.MouseEventHandler<HTMLButtonElement> = () => {
      this.RemoveItem(index);
    };
    return OnClick;
  }
}

interface ListItemProps {
  state: () => ListState;
  item: number;
  index: number;
}

const ListItem: FC<ListItemProps> = ({ state, item, index }) => {
  return (
    <li>
      <span>{String(item).padStart(5, "0")} </span>
      <button onClick={state().RemoveItemClicked(index)}>X</button>
    </li>
  );
};

export default function App() {
  const state = useClassState(ListState, []);
  return (
    <div className="App">
      <ul>
        {state().list.map((item, i) => (
          <ListItem key={i} state={state} item={item} index={i} />
        ))}
      </ul>
      <button onClick={state().AddItemClicked}>Add Item</button>
    </div>
  );
}
```
