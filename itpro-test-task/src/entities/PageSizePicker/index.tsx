import { Select } from "antd";
import s from "./styles.module.scss";
import { useSearchParams } from "react-router-dom";
import { useLayoutEffect, useState } from "react";

const options = [
  {
    value: 5,
    label: 5,
  },
  {
    value: 10,
    label: 10,
  },
  {
    value: 20,
    label: 20,
  },
];

export const PAGE_SIZE_PARAM_NAME = "size";
export const MAX_PAGE_SIZE = 100;

export const PageSizePicker = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [defVal, setDefVal] = useState<number>(20);

  const sizeParam = Math.abs(Number(searchParams.get(PAGE_SIZE_PARAM_NAME)));

  useLayoutEffect(() => {
    if (!sizeParam || (sizeParam && sizeParam > MAX_PAGE_SIZE)) {
      searchParams.set(PAGE_SIZE_PARAM_NAME, "20");
      setSearchParams(searchParams, { replace: true });
    }

    if (sizeParam) {
      setDefVal(sizeParam);
    }
  }, [searchParams, setSearchParams, sizeParam]);

  const handleChange = (value: number) => {
    searchParams.set(PAGE_SIZE_PARAM_NAME, String(value));
    setSearchParams(searchParams);
  };

  return (
    <div className={s.wrapper}>
      <Select
        onChange={handleChange}
        value={defVal}
        showSearch={false}
        style={{ width: 100 }}
        options={options}
        tagRender={() => <div />}
        placeholder="Размер страницы"
      />
    </div>
  );
};
