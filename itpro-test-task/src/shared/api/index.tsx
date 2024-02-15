import axios from "axios";
import { GetEverythingResponse } from "../types/apiTypes";

const axiosInstance = axios.create({
  baseURL: "https://newsapi.org/v2/",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
});

const LANG = "en";

export type getNewsParams = {
  q: string | null;
  sort: string | null;
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
    urlParams.append("language", LANG);

    return axiosInstance.get<GetEverythingResponse>("top-headlines", {
      params: urlParams,
    });
  },
};

export default $api;
