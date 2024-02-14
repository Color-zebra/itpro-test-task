import { create } from "zustand";
import { Columns } from "../vars/columns";

type ColumnsState = {
  shownColumns: Columns[];
  showColumn: (column: Columns) => void;
  hideColumn: (column: Columns) => void;
};

export const useColumns = create<ColumnsState>((set) => ({
  shownColumns: [Columns.TITLE, Columns.PUBLISHED, Columns.DESC, Columns.URL],
  showColumn: (column) =>
    set((state) => ({
      ...state,
      shownColumns: [...state.shownColumns, column],
    })),
  hideColumn: (column) =>
    set((state) => ({
      ...state,
      shownColumns: state.shownColumns.filter((item) => item !== column),
    })),
}));
