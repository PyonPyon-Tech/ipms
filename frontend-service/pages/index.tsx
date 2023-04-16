import { Layout } from "@components/layout";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import Breadcrumbs from "@components/layout/breadcrumbs";
import { NextPage } from "next";
import { ReactElement } from "react";

const Home: NextPage = () => {
  return (
    <div className="mb-4 w-full p-8 md:p-12 md:pt-0">
    </div>
  );
};
export default withAuth(withLayout(Home));
