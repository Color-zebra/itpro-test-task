import { Row } from "@/entities/row";
import $api from "@/shared/api";
import { useColumns } from "@/shared/store/columnsSlice";
import { useEffect, useState } from "react";

export const MainPage = () => {
  const [news, setNews] = useState([]);
  const { hideColumn, shownColumns } = useColumns((state) => state);

  const handleClick = (column: string) => {
    hideColumn(column);
  };

  useEffect(() => {
    $api.getSources().then((data) => {
      setNews(data.data.sources);
      console.log(data);
    });
  }, []);

  return (
    <table>
      <thead>
        {shownColumns.map((column) => (
          <td onClick={() => handleClick(column)}>{column}</td>
        ))}
      </thead>
      <tbody>
        {news.map((item) => (
          <Row
            key={item.name}
            data={{
              author: item.name,
              content: item.name,
              description: item.name,
              publishedAt: item.name,
              source: item.name,
              title: item.name,
              url: item.name,
            }}
          />
        ))}
      </tbody>
    </table>
  );
};
