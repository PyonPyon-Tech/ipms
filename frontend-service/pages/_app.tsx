import "styles/globals.css";
import { ReactElement, ReactNode, useEffect } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { AuthProvider } from "@contexts/auth";
import { useAuth } from "@hooks/useAuth";
import { useRouter } from "next/router";

export default function MyApp({ Component, pageProps }: AppProps) {
  // Use the layout defined at the page level, if available

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
