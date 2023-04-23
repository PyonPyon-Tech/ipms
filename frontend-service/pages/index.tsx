import { Tag } from "@components/general/Tag";
import Breadcrumbs from "@components/layout/breadcrumbs";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { NextPage } from "next";
import { ReactElement, useState } from "react";

const Home: NextPage = () => {
  const [amount, setAmount] = useState<number>();
  return (
    <div className="mb-4 w-full">
      <Tag title="Aktif"></Tag>
    </div>
  );
};
export default withAuth(withLayout(Home));
