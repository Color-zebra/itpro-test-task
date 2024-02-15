import { ColumnPicker } from "@/entities/ColumnPicker";
import { SortPicker } from "@/entities/SortPicker";
import s from "./styles.module.scss";

export const ControlPanel = () => {
  return (
    <div className={s.wrapper}>
      <ColumnPicker />
      <SortPicker />
    </div>
  );
};
