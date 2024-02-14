import $api from "@/shared/api";
import { useEffect, useState } from "react";

export const MainPage = () => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    const data = $api.getSources().then((data) => {
      setNews(data.data.sources);
      console.log(data);
    });
  }, []);
  return (
    <div>
      {news.map((item) => (
        <div>{item.name}</div>
      ))}
    </div>
  );
};
