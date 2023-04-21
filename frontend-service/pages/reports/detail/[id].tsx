import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { NextPage } from "next";
import { CsrForm } from "@components/csr";
import { CsrFormProvider } from "@contexts/csrForm";
import { CsrReportDetailPage } from "@components/csr/result";

const AddReportPage: NextPage = () => {
  return (
    <CsrFormProvider>
      <div className="mb-4 w-full p-8 md:p-12 md:pt-0">
        <CsrReportDetailPage />
      </div>
    </CsrFormProvider>
  );
};
export default withAuth(withLayout(AddReportPage));
