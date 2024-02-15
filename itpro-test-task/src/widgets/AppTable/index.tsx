import $api from "@/shared/api";
import { useColumns } from "@/shared/store/columnsSlice";
import { ResponseArticle } from "@/shared/types/apiTypes";
import { Columns } from "@/shared/vars/columns";
import { Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import s from "./styles.module.scss";

interface DataType extends Record<keyof typeof Columns, string | null> {
  key: string;
}

const getColumnKey = (value: string) =>
  Object.keys(Columns).find(
    (item) => Columns[item as keyof typeof Columns] === value
  );

const prepareData = (responseData: ResponseArticle[]): DataType[] => {
  return responseData.map((article) => ({
    ...article,
    source: article.source.name,
    key: article.url!,
  }));
};

export const AppTable = () => {
  const { shownColumns } = useColumns((store) => store);
  const [data, setData] = useState<DataType[]>([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    console.log(searchParams.getAll);
    $api.getNews().then((data) => {
      setData(prepareData(data.data.articles));
    });
  }, [searchParams]);

  const columns = useMemo(
    () =>
      shownColumns.map((column) => {
        const columnKey = getColumnKey(column);

        return {
          title: column,
          dataIndex: columnKey,
          key: column,
          width: `${100 / shownColumns.length}%`,
          render: (text: string) =>
            columnKey === "url" ? (
              <a target="_blank" href={text}>
                Читать дальше
              </a>
            ) : (
              text
            ),
        };
      }),
    [shownColumns]
  );

  if (shownColumns.length === 0) {
    return null;
  }
  return (
    <div className={s.wrapper}>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};
