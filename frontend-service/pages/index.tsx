import { Layout } from "@components/layout";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { NextPage } from "next";
import { ReactElement } from "react";
import Breadcrumbs  from "components/layout/breadcrumbs";


const Home: NextPage = () => {
  return (
    <div className="mb-4 w-full p-8 md:p-12 md:pt-0">
      <Breadcrumbs></Breadcrumbs>
    </div>
  );
};
export default withAuth(withLayout(Home));
