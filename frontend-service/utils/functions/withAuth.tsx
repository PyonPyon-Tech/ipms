import { Loading } from "@components/general/Loading";
import { AxiosClient, setToken, URL_AUTH } from "@constants/api";
import { useAuth } from "@hooks/useAuth";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";

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
          toast.dismiss();
          toast.error("Anda harus login terlebih dahulu");
          router.replace("/signin");
        }
      }
      if (!user) {
        console.log("Load from cookies");
        loadUserFromCookies();
      }
    }, [user]);

    if (!user) {
      return (
        <div className="h-screen w-screen">
          <Loading />
        </div>
      );
    }

    return <Component />; // Render whatever you want while the authentication occurs
  };

  return AuthenticatedComponent;
};
