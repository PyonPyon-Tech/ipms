import React, { createContext, useState, useContext, useEffect, FC } from "react";
import Router, { useRouter } from "next/router";
import Cookies from "js-cookie";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { User } from "@models/user";
import { AxiosClient, setToken, URL_AUTH } from "@constants/api";
import { AxiosError } from "axios";

export const AuthContext = createContext<{
  user?: User | null;
  login: (username: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  retrieveUser: (token: string) => Promise<any>;
}>({
  user: undefined,
  login: async (username: string, password: string) => {},
  logout: async () => {},
  retrieveUser: async (token: string) => {},
});

export const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null | undefined>();
  const r = useRouter();

  const retrieveUser = async (token: string) => {
    AxiosClient.get(`${URL_AUTH}/user`)
      .then((response) => {
        console.log(response);
        setUser(response.data);
      })
      .catch((err: AxiosError) => {
        r.push("/signin");
        console.log(err);
        toast.error(err.message);
      });
  };

  const login = async (username: string, password: string) => {
    const t = toast.loading("Logging In...");
    AxiosClient.post(URL_AUTH, {
      username,
      password,
    })
      .then((response) => {
        Cookies.set("token", response.data.token, { expires: 3 });
        setToken(response.data.token);
        retrieveUser(response.data.token);
        console.log("SUKSES");
        console.log(response);
        r.push("/");
      })
      .catch((err: AxiosError) => {
        toast.error("Masukan Username dan Password yang Tepat");
      })
      .finally(() => {
        toast.dismiss(t);
      });
  };

  const logout = async () => {
    Cookies.remove("token");
    setToken("");
    r.push("/signin");
    setUser(undefined);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, retrieveUser }}>
      <Toaster />
      {children}
    </AuthContext.Provider>
  );
};
