import { AxiosClient, setToken, URL_AUTH } from "@constants/api";
import { useAuth } from "@hooks/useAuth";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const withAuth = (Component: NextPage) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();
    const { user, retrieveUser } = useAuth();

    useEffect(() => {
      async function loadUserFromCookies() {
        const token = Cookies.get("token");
        if (token) {
          setToken(token);
          retrieveUser(token);
        } else {
          console.log("No Token");
          router.push("/");
        }
      }
      if(!user){
        console.log("Load from cookies")
        loadUserFromCookies();
      }
    }, [user]);

    return <Component />; // Render whatever you want while the authentication occurs
  };

  return AuthenticatedComponent;
};
