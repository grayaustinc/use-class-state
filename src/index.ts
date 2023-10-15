import { useState } from "react";
import useUpdate from "./useUpdate";
import useUpdateEffect from "./useUpdateEffect";

const UpdateSymbol = Symbol("update");

type UpdateFunction = () => any;

export class ClassState {
  [UpdateSymbol]: UpdateFunction = () => {};
}

export function updateClassState<UsedClassState extends ClassState>(state: UsedClassState) {
  return state[UpdateSymbol]();
}

function useClassState<Target extends new (...args: any[]) => ClassState>(State: Target, args: ConstructorParameters<Target>): () => InstanceType<Target> {
  const [state, setState] = useState(() => new State(args));
  state[UpdateSymbol] = useUpdate();
  useUpdateEffect(() => setState(new State(args)), args);
  return () => state as InstanceType<Target>;
}

export default useClassState;
