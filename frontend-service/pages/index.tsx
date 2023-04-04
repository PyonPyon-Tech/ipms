import { Layout } from "@components/layout";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { NextPage } from "next";
import { ReactElement } from "react";
import Breadcrumbs  from "components/layout/breadcrumbs";


const Home: NextPage = () => {
  return (
    <div className="">
      <Breadcrumbs />

      <h1>Hai Hia</h1>
    </div>
  );
};
export default withAuth(withLayout(Home));
