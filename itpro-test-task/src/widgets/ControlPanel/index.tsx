import { ColumnPicker } from "@/entities/ColumnPicker";
import { SortPicker } from "@/entities/SortPicker";
import s from "./styles.module.scss";
import { SearchBar } from "@/entities/SearchBar";

export const ControlPanel = () => {
  return (
    <div className={s.wrapper}>
      <ColumnPicker />
      <SortPicker />
      <SearchBar />
    </div>
  );
};
