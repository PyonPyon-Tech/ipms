import { CustomerContainer } from "@components/customers/CustomerList";
import { Title } from "@components/general/Title";
import { AxiosClient, URL_CUSTOMER } from "@constants/api";
import {
  filterData,
  filterDataNested,
  filterDataOnlyNested,
} from "@functions/filterData";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { useAuth } from "@hooks/useAuth";
import { Customer, CustomerClass } from "@models/customer/customer";
import { Outlet, OutletClass } from "@models/customer/outlet";
import { User } from "@models/user";
import { Pagination } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SearchCustomers: NextPage = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [term, setTerm] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [customerAmount, setCustomerAmount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  const { user } = useAuth();

  async function retrieveAllCustomers() {
    const result = await AxiosClient.get(`${URL_CUSTOMER}/pages/${page}`);
    const data: Customer[] = [];
    result.data.data.forEach((customer: any) => {
      let customerObj = new CustomerClass(customer);
      customerObj.outlets = [];
      customer.outlets.forEach((outlet: any) => {
        customerObj.outlets.push(new OutletClass(outlet));
      });
      data.push(customerObj);
    });

    setCustomerAmount(result.data.count);
    setTotalPages(result.data.totalPages);
    setCustomers(data);
  }

  async function filterByCustomerName(name: string) {
    const result = await AxiosClient.get(
      `${URL_CUSTOMER}/filter?name=${name}&page=${page}`
    );
    const data: Customer[] = [];
    result.data.data.forEach((customer: any) => {
      let customerObj = new CustomerClass(customer);
      customerObj.outlets = [];
      customer.outlets.forEach((outlet: any) => {
        customerObj.outlets.push(new OutletClass(outlet));
      });
      data.push(customerObj);
    });

    setCustomerAmount(result.data.count);
    setTotalPages(result.data.totalPages);
    setCustomers(data);
  }

  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    if (user.role != 1 && user.role != 2 ) {
      router.push("/");
    } else {
      retrieveAllCustomers();
    }
  }, [user, page]);

  return (
    <div className="mb-4 w-full md:pt-0">
      <section>
        <Title
          title="Daftar Customer"
          action={{ name: "Tambah", path: "/customers/add" }}
        >
          <h4>Total: {customerAmount} customer</h4>
        </Title>
        <div className="relative mb-4 w-4/5 max-w-[500px]">
          <img
            src="/icons/search.svg"
            className="absolute top-1/2 left-4 -translate-y-1/2 md:scale-[180%]"
          />
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                filterByCustomerName(term);
              }
            }}
            className="w-full rounded-md border border-black py-2 pl-10 pr-4 font-normal"
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
        <div className="w-full flex items-center justify-center my-10">
          <Pagination
            page={page ?? 1}
            count={totalPages ?? 1}
            onChange={(_, value) => {
              setPage(Number(value));
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default withAuth(withLayout(SearchCustomers));
