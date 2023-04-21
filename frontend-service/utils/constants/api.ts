import axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_BE_ENDPOINT || "";
export const URL_AUTH = `/api/v1/authenticate`;
export const URL_REPORT = `/api/v1/reports`;
export const URL_EMPLOYEE = `/api/v1/employees`
export const URL_SCHEDULE = `/api/v1/schedules` // TODO: HAPUS http di PRODUCTION
export const URL_CUSTOMER = `/api/v1/customers`;
export const URL_IMAGE = `/api/v1/images`;
export const URL_INVENTORY = `api/v1/inventory`;

const AxiosClient = axios.create({
  // baseURL: BASE_URL,// TODO: HAPUS INI 
  headers:{
    "Accept": "application/json",
    "Content-Type": "application/json",
  }
});

const setToken = (token: string) => {
  AxiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export { AxiosClient, setToken };
