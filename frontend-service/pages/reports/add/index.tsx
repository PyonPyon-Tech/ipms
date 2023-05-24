import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { NextPage } from "next";
import { CsrForm } from "@components/csr";
import { CsrFormProvider } from "@contexts/csrForm";
import { Title } from "@components/general/Title";
import { useAuth } from "@hooks/useAuth";
import { useRouter } from "next/router";

const AddReportPage: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  if (user?.role != 4 ) {
    router.push("/");
  }

  return (
    <CsrFormProvider>
      <Title title={"Membuat Laporan Treatment"} />
      <CsrForm />
    </CsrFormProvider>
  );
};
export default withAuth(withLayout(AddReportPage));
