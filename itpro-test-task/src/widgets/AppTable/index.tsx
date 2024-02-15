import $api from "@/shared/api";
import { useColumns } from "@/shared/store/columnsSlice";
import { ResponseArticle } from "@/shared/types/apiTypes";
import { Columns } from "@/shared/vars/columns";
import { Spin, Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import s from "./styles.module.scss";
import { SORT_PARAM_NAME } from "@/entities/SortPicker";
import { SEARCH_PARAM_NAME } from "@/entities/SearchBar";
import { PAGE_SIZE_PARAM_NAME } from "@/entities/PageSizePicker";
import { useAppState } from "@/shared/store/appSlice";

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

const READ_MORE_BUTTON_TEXT = "Читать полностью";

export const AppTable = () => {
  const { shownColumns } = useColumns((store) => store);
  const { setIsError, setIsLoading, isLoading } = useAppState((state) => state);
  const [data, setData] = useState<DataType[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchParams] = useSearchParams();
  const pageSize = Number(searchParams.get(PAGE_SIZE_PARAM_NAME));

  const handlePageChange = (val: number) => {
    setCurrentPage(val);
  };

  useEffect(() => {
    const sort = searchParams.get(SORT_PARAM_NAME);
    const q = searchParams.get(SEARCH_PARAM_NAME);
    setIsLoading(true);

    $api
      .getNews({
        q,
        sort,
        page: String(currentPage),
        pageSize: String(pageSize),
      })
      .then((data) => {
        console.log(data.data);

        setData(prepareData(data.data.articles));
        setTotalItems(data.data.totalResults);
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  }, [currentPage, pageSize, searchParams, setIsError, setIsLoading]);

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
                {READ_MORE_BUTTON_TEXT}
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
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <Table
          pagination={{
            pageSize: pageSize,
            total: totalItems,
            current: currentPage,
            onChange: handlePageChange,
            showSizeChanger: false,
          }}
          columns={columns}
          dataSource={data}
        />
      )}
    </div>
  );
};
