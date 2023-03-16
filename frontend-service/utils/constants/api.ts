import axios from "axios";

export const BASE_URL =
  process.env.NEXT_PUBLIC_BE_ENDPOINT || "http://localhost:8080";
export const URL_AUTH = `${BASE_URL}/api/v1/authenticate`;
export const URL_REPORT = `${BASE_URL}/api/v1/reports`;

const AxiosClient = axios.create({
  baseURL: BASE_URL,
  headers:{
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  }
});

const setToken = (token: string) => {
  AxiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export { AxiosClient, setToken };
