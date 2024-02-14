import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://newsapi.org/v2/",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
});

const $api = {
  getNews: () => axiosInstance.get("top-headlines"),
  getSources: () => axiosInstance.get("top-headlines/sources"),
};

export default $api;
