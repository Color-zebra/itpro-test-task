import { Select } from "antd";
import s from "./styles.module.scss";
import { SortTypes } from "@/shared/vars/sorts";
import { useSearchParams } from "react-router-dom";
import { useLayoutEffect, useState } from "react";

const options = Object.entries(SortTypes).map((item) => ({
  value: item[0],
  label: item[1],
}));

const isSort = (val: string): val is SortTypes => {
  return Object.keys(SortTypes).includes(val);
};

const SORT_PARAM_NAME = "sort";

export const SortPicker = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [defVal, setDefVal] = useState<null | SortTypes>(null);

  const sortParam = searchParams.get(SORT_PARAM_NAME);

  useLayoutEffect(() => {
    if (sortParam && !isSort(sortParam)) {
      searchParams.delete(SORT_PARAM_NAME);
      setSearchParams(searchParams, { replace: true });
    }

    if (sortParam && isSort(sortParam)) {
      setDefVal(sortParam);
    }
  }, [sortParam, searchParams, setSearchParams]);

  const handleChange = (value: SortTypes) => {
    searchParams.set(SORT_PARAM_NAME, value);
    setSearchParams(searchParams);
  };

  return (
    <div className={s.wrapper}>
      <Select
        onChange={handleChange}
        value={defVal}
        showSearch={false}
        style={{ width: 180 }}
        options={options}
        tagRender={() => <div />}
        placeholder="Сортировать по..."
      />
    </div>
  );
};
