import axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_BE_ENDPOINT || "http://localhost:3000";
export const URL_AUTH = `http://localhost:3000/api/v1/authenticate`;
export const URL_REPORT = `http://localhost:3000/api/v1/reports`;
export const URL_EMPLOYEE = `http://localhost:3000/api/v1/employees`
export const URL_SCHEDULE = `http://localhost:3000/api/v1/schedules` // TODO: HAPUS http di PRODUCTION
export const URL_CUSTOMER = `http://localhost:3000/api/v1/customers`;

const AxiosClient = axios.create({
  baseURL: BASE_URL,// TODO: HAPUS INI 
  headers:{
    "Accept": "application/json",
    "Content-Type": "application/json",
  }
});

const setToken = (token: string) => {
  AxiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export { AxiosClient, setToken };
