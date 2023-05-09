import { ComplaintContainer } from "@components/complaints/ComplaintList";
import { Search } from "@components/general/Search";
import { Title } from "@components/general/Title";
import { AxiosClient, URL_CUSTOMER, URL_EMPLOYEE } from "@constants/api";
import { ROLES } from "@constants/roles";
import { filterData, filterDataDoublyNested, filterDataNested, filterDataOnlyNested } from "@functions/filterData";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { useAuth } from "@hooks/useAuth";
import { Complaint, ComplaintClass } from "@models/customer/complaint";
import { Customer } from "@models/customer/customer";
import { User } from "@models/user";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const SearchComplaints: NextPage = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    async function retrieveAllComplaints() {
      const results = await Promise.all([
        AxiosClient.get(`${URL_CUSTOMER}/complaints`),
      ]);
      const data: Complaint[] = [];
      results.forEach((result) => {
        result.data.forEach((complaint: any) => {
          data.push(new ComplaintClass(complaint));
        });
      });
      setComplaints(data);
      console.log(complaints);
    }
    retrieveAllComplaints();
  }, [user]);

  return (
    <div className="mb-4 w-full md:pt-0">
      <section>
        <Title
          title="Daftar Komplain"
          action={{ name: "Ajukan", path: "/complaints/add" }}
        >
          <h4>Total: {complaints.length} komplain</h4>
        </Title>
        {ROLES[user?.role ?? 0] != "Customer" && <Search setSearchTerm={setSearchTerm} placeholder="Nama Customer" />}
      </section>
      <section>
        <ComplaintContainer
          data={filterDataDoublyNested<Complaint, Customer, User>(
            complaints,
            "customer",
            "user",
            searchTerm,
            ["name"]
          )}
        />
      </section>
    </div>
  );
};

export default withAuth(withLayout(SearchComplaints));
