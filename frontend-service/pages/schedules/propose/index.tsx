import { getPeriodFromDate } from "@functions/getPeriodFromDate";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { useAuth } from "@hooks/useAuth";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";

const DefaultPropose: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/schedules/propose/" + getPeriodFromDate(new Date()));
  }, [router]);
  return <div></div>;
};

export default withAuth(withLayout(DefaultPropose));
