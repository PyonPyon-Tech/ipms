import { CustomerContainer } from "@components/customers/CustomerList";
import { Title } from "@components/general/Title";
import { AxiosClient, URL_CUSTOMER } from "@constants/api";
import { filterData, filterDataNested, filterDataOnlyNested } from "@functions/filterData";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { useAuth } from "@hooks/useAuth";
import { Customer, CustomerClass } from "@models/customer/customer";
import { Outlet, OutletClass } from "@models/customer/outlet";
import { User } from "@models/user";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const SearchCustomers: NextPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [term, setTerm] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { user } = useAuth();
  useEffect(() => {
    if (!user) return;
    async function retrieveAllCustomers() {
      const results = await Promise.all([
        AxiosClient.get(`${URL_CUSTOMER}`),
      ]);
      const data: Customer[] = [];
      results.forEach((result) => {
        result.data.forEach((customer: any) => {
          let customerObj = new CustomerClass(customer);
          customerObj.outlets = [];
          customer.outlets.forEach((outlet: any) => {
            customerObj.outlets.push(new OutletClass(outlet));
          });
          data.push(customerObj);
        });
      });
      console.log(data);
      setCustomers(data);
    }
    retrieveAllCustomers();
  }, [user]);
  return (
    <div className="mb-4 w-full p-8 md:p-12 md:pt-0">
      <section>
        <Title
          title="Daftar Customer"
          action={{ name: "Tambah", path: "/customers/add" }}
        >
          <h4>Total: {customers.length} orang</h4>
        </Title>
        <div className="relative w-4/5 max-w-[500px]">
          <img
            src="/icons/search.svg"
            className="absolute top-1/2 left-4 -translate-y-1/2 md:scale-[180%]"
          />
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                setSearchTerm(term);
              }
            }}
            className="w-full rounded-lg border border-[#1E1E1E] py-2 pl-10 pr-4 font-normal"
            placeholder="Cari Customer"
          />
        </div>
      </section>
      <section>
        <CustomerContainer
          data={filterDataOnlyNested<Customer, User>(
            customers,
            "user",
            searchTerm,
            ["name", "username"]
          )}
        />
      </section>
    </div>
  );
};

export default withAuth(withLayout(SearchCustomers));
