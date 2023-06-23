import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/", // JSON Server의 주소에 맞게 변경
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

// axios#post(url[, data[, config]]) , axios#get(url[, config])
