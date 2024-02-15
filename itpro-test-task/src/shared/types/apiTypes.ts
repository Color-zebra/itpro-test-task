import { Columns } from "../vars/columns";

export interface Article extends Record<keyof typeof Columns, string | null> {}

export type ResponseArticle = Omit<Article, "source"> & {
  source: {
    name: string;
    id: string;
  };
};

export type GetEverythingResponse = {
  status: string;
  totalResults: number;
  articles: ResponseArticle[];
};
