import { useColumns } from "@/shared/store/columnsSlice";
import { Columns } from "@/shared/vars/columns";
import { Select } from "antd";
import s from "./styles.module.scss";

const options = Object.values(Columns).map((item) => ({
  value: item,
  label: item,
}));

export const ColumnPicker = () => {
  const { shownColumns, updateColumns } = useColumns((state) => state);
  const handleChange = (value: Columns[]) => {
    updateColumns(value);
  };
  return (
    <div className={s.wrapper}>
      <div className={s.title}>Колонки</div>
      <Select
        defaultValue={shownColumns}
        onChange={handleChange}
        showSearch={false}
        mode="multiple"
        style={{ width: 120 }}
        options={options}
        tagRender={() => <div />}
      />
    </div>
  );
};
