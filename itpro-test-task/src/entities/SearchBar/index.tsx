import { Input } from "antd";
import s from "./styles.module.scss";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const DEBOUNCE_TIME = 1000;

export const SEARCH_PARAM_NAME = "search";

export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParam = searchParams.get(SEARCH_PARAM_NAME);
  const [inputValue, setInputValue] = useState<string>(searchParam ?? "");
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(
    null
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    setInputValue(val);

    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      if (val) {
        searchParams.set(SEARCH_PARAM_NAME, val);
      } else {
        searchParams.delete(SEARCH_PARAM_NAME);
      }
      setSearchParams(searchParams);
    }, DEBOUNCE_TIME);

    setTimer(newTimer);
  };

  useEffect(
    () => () => {
      if (timer) {
        return clearTimeout(timer);
      }
    },
    [timer]
  );

  return (
    <div className={s.wrapper}>
      <Input
        onChange={handleChange}
        value={inputValue}
        placeholder="Искать..."
      />
    </div>
  );
};
