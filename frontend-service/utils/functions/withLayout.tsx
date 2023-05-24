import { Layout } from "@components/layout";
import { NextPage } from "next";
import Head from "next/head";
import { ReactElement } from "react";

export const withLayout = (Component: NextPage): NextPage => {
  const LayoutedComponent = () => {
    return (
      <Layout>
        <>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
            <meta name="description" content="" />
            <title>Ipms</title>
            <link rel="shortcut icon" href="/ecolab.ico" />
          </Head>
          <Component/>
        </>
      </Layout>
    );
  };
  return LayoutedComponent;
};
