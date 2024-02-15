import axios from "axios";
import { GetEverythingResponse } from "../types/apiTypes";

const axiosInstance = axios.create({
  baseURL: "https://newsapi.org/v2/",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
});

const LANG = "google-news";

export type getNewsParams = {
  q: string | null;
  sortBy: string | null;
  pageSize: string;
  page: string;
};

const $api = {
  getNews: (params: getNewsParams) => {
    const urlParams = new URLSearchParams();

    Object.entries(params).forEach((param) => {
      if (param[1]) {
        urlParams.append(param[0], param[1]);
      }
    });
    urlParams.append("sources", LANG);

    return axiosInstance.get<GetEverythingResponse>("everything", {
      params: urlParams,
    });
  },
};

export default $api;
