import { useState } from "react";
import useUpdate from "./useUpdate";
import useUpdateEffect from "./useUpdateEffect";

const UpdateSymbol = Symbol("update");

type UpdateFunction = () => void;
type ConstructorType<ClassState> = new (...args: any[]) => ClassState;

/**
 * Represents a callback function that, when invoked, returns an instance of a class
 * whose constructor conforms to the specified ClassState.
 */
export type ClassStateCallback<Target extends ClassState> = () => ConstructorType<Target> extends abstract new (...args: any[]) => infer R ? R : any;

export class ClassState {
  [UpdateSymbol]: UpdateFunction = () => {};
}

export function updateClassState<UsedClassState extends ClassState>(state: UsedClassState) {
  return state[UpdateSymbol]();
}

function useClassState<Target extends ConstructorType<ClassState>>(State: Target, args: ConstructorParameters<Target>): ClassStateCallback<InstanceType<Target>> {
  const [state, setState] = useState(() => new State(args));
  state[UpdateSymbol] = useUpdate();
  useUpdateEffect(() => setState(new State(args)), args);
  return () => state as InstanceType<Target>;
}

export default useClassState;
