import { create } from "zustand";

type TestState = {
  counter: number;
  inc: () => void;
};

export const useTest = create<TestState>((set) => ({
  counter: 0,
  inc: () =>
    set((state) => ({
      counter: state.counter + 1,
    })),
}));
