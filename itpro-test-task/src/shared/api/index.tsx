import axios from "axios";
import { GetEverythingResponse } from "../types/apiTypes";

const axiosInstance = axios.create({
  baseURL: "https://newsapi.org/v2/",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
});

const $api = {
  getNews: () =>
    axiosInstance.get<GetEverythingResponse>("top-headlines?language=ru"),
  getSources: () => axiosInstance.get("top-headlines/sources"),
};

export default $api;
