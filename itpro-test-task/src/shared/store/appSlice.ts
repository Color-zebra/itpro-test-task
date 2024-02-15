import { create } from "zustand";

type AppState = {
  isError: boolean;
  isLoading: boolean;
  setIsError: (val: boolean) => void;
  setIsLoading: (val: boolean) => void;
};

export const useAppState = create<AppState>((set) => ({
  isError: false,
  isLoading: true,
  setIsError: (val) =>
    set((state) => ({
      ...state,
      isError: val,
    })),
  setIsLoading: (val) =>
    set((state) => ({
      ...state,
      isLoading: val,
    })),
}));
