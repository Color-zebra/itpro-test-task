import { Columns } from "@/shared/vars/columns";
import s from "./styles.module.scss";
import { useColumns } from "@/shared/store/columnsSlice";

type RowProps = {
  data: Record<Columns, string>;
};

export const Row = ({ data }: RowProps) => {
  const { shownColumns } = useColumns((store) => store);

  return (
    <tr className={s.row}>
      {shownColumns.map((column) => (
        <td>{data[column]}</td>
      ))}
    </tr>
  );
};
