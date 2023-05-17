import { ComplaintContainer } from "@components/complaints/ComplaintList";
import { CustomerDashboard } from "@components/dashboard/customerDashboard";
import { Title } from "@components/general/Title";
import { AxiosClient, URL_DASHBOARD } from "@constants/api";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { useAuth } from "@hooks/useAuth";
import { ComplaintData } from "@models/dashboard/customer/complaint";
import { MonthlyVisitationData } from "@models/dashboard/customer/monthlyVisitation";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { ROLES } from "@constants/roles";

const Home: NextPage = () => {
  const { user } = useAuth();
  const [customerMonthlyVisitationData, setCustomerMonthlyVisitationData] = useState<MonthlyVisitationData>({ completedVisitations: 0, totalVisitations: 0 });
  const [customerComplaintData, setCustomerComplaintData] = useState<ComplaintData>({ acknowledgedComplaints: 0, totalComplaints: 0 });

  useEffect(() => {
    if (!user) return;

    async function retrieveCustomerDashboardData() {
      const customerMonthlyVisitationsResult = await AxiosClient.get(`${URL_DASHBOARD}/customers/visitations`);
      setCustomerMonthlyVisitationData(customerMonthlyVisitationsResult.data);

      const customerComplaintsResult = await AxiosClient.get(`${URL_DASHBOARD}/customers/complaints`);
      setCustomerComplaintData(customerComplaintsResult.data);
    }

    if (ROLES[user?.role ?? 0] == "Customer") {
      retrieveCustomerDashboardData();
    }
  }, [user]);
  
  return (
    <div className="mb-10">
      <Title title="Dashboard"></Title>
      {ROLES[user?.role ?? 0] == "Customer" && <CustomerDashboard 
        monthlyVisitationData={customerMonthlyVisitationData} 
        complaintData={customerComplaintData}
      />}
    </div>
  );
  // <div className="mb-4 flex w-full flex-col gap-4">
  //   <div className="flex h-[200px] w-full justify-around gap-4 rounded-md bg-coral-light p-4">
  //     <div className="h-full w-full rounded-md bg-coral-light">
  //       <p className="font-semibold">
  //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta nam
  //         animi perspiciatis aliquam, rerum quo, tempore qui ipsum quasi
  //         fuga magni alias architecto assumenda recusandae adipisci fugit
  //         iusto placeat cum? 
  //       </p>
  //     </div>
  //     <div className="h-full w-full rounded-md bg-coral"></div>
  //   </div>
  // </div>
  // <div className="mb-4 flex w-full gap-4">
  //   <div className="h-[200px] w-full rounded-md bg-teal-dark"></div>
  //   <div className="h-[200px] w-full rounded-md bg-blue-dark"></div>
  //   <div className="h-[200px] w-full rounded-md bg-orange-dark"></div>
  // </div>
  // <div className="mb-4 flex w-full gap-4">
  //   <div className="h-[200px] w-full rounded-md bg-orange-light"></div>
  //   <div className="h-[200px] w-full rounded-md bg-teal"></div>
  // </div>
};
export default withAuth(withLayout(Home));
