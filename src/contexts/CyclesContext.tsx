import { createContext, ReactNode, useReducer, useState } from 'react';
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer.ts';
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions.ts';

interface CreateNewCycleFormData {
  task: string;
  minutesAmount: number;
}

interface CyClesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  markCycleAsFinished: () => void;
  amountSecondPassed: number;
  handleSetAmountSecondPassed: (seconds: number) => void;
  createNewCycle: (data: CreateNewCycleFormData) => void;
  interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyClesContextType);

interface CyclesContextProviderProps {
  children: ReactNode;
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  });
  const [amountSecondPassed, setAmountSecondPassed] = useState(0);
  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles?.find((cycle) => cycle.id === activeCycleId);

  function markCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction());
  }
  function handleSetAmountSecondPassed(seconds: number) {
    setAmountSecondPassed(seconds);
  }
  function createNewCycle(data: CreateNewCycleFormData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };
    dispatch(addNewCycleAction(newCycle));

    setAmountSecondPassed(0);
    // reset();
  }
  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction());
  }

  return (
    <CyclesContext
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCycleAsFinished,
        amountSecondPassed,
        handleSetAmountSecondPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext>
  );
}
