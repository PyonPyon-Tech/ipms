import { Layout } from "@components/layout";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { NextPage } from "next";
import { ReactElement } from "react";

const Home: NextPage = () => {
  return (
    <div className="">
      <h1>Hai Hia</h1>
    </div>
  );
};
export default withAuth(withLayout(Home));
