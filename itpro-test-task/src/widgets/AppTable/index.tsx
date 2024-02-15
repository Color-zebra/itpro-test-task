import { useColumns } from "@/shared/store/columnsSlice";
import { Table } from "antd";
import { useMemo } from "react";

const mockData = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

export const AppTable = () => {
  const { shownColumns } = useColumns((store) => store);

  const columns = useMemo(
    () =>
      shownColumns.map((column) => ({
        title: column,
        dataIndex: column,
        key: column,
      })),
    [shownColumns]
  );
  return (
    <div>
      <Table columns={columns} />
    </div>
  );
};
