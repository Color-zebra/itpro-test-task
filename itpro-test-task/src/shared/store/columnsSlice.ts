import { create } from "zustand";
import { Columns } from "../vars/columns";

type ColumnsState = {
  shownColumns: Columns[];
  showColumn: (column: Columns) => void;
  hideColumn: (column: Columns) => void;
  updateColumns: (columns: Columns[]) => void;
};

export const useColumns = create<ColumnsState>((set) => ({
  shownColumns: [
    Columns.title,
    Columns.publishedAt,
    Columns.description,
    Columns.url,
  ],
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
  updateColumns: (columns) =>
    set((state) => ({
      ...state,
      shownColumns: columns,
    })),
}));
