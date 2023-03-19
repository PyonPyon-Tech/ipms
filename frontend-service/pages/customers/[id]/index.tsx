import { CustomerDetail } from "@components/customers/CustomerDetail";
import { OutletContainer } from "@components/customers/OutletList";
import { filterData, filterDataNested } from "@functions/filterData";
import { Title } from "@components/general/Title";
import { AxiosClient, URL_CUSTOMER } from "@constants/api";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { useAuth } from "@hooks/useAuth";
import { Customer, CustomerClass } from "@models/customer/customer";
import { Outlet, OutletClass } from "@models/customer/customer/outlet";
import { AxiosError } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CustomerDetailPage: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [customer, setCustomer] = useState<Customer>();
  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [term, setTerm] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (!user) return;
    if (!router.query.id) return;
    async function retrieveCustomer() {
      AxiosClient.get(`${URL_CUSTOMER}/${router.query.id}`)
        .then((response) => {
          let customerObj = new CustomerClass(response.data);
          setOutlets(customerObj.outlets);
          setCustomer(customerObj);
          console.log(response.data);
        })
        .catch((err: AxiosError) => {
          toast.error(err.message);
          console.log(err);
        });
    }
    retrieveCustomer();
  }, [user, router]);

  return (
    <div className="w-full p-8 md:p-12 md:pt-0">
      <section>
        <Title
          title="Detail Customer"
          action={{
            name: "Ubah",
            path: `/customers/${router.query.id}/edit`,
          }}
        />
      </section>

      {!!customer && <CustomerDetail {...customer} />}

      <section className="py-6">
        <Title
          title="Daftar Outlet"
          action={{ name: "Tambah", path: "/outlets/add" }}
        >
          <h4>Total: {outlets.length} outlet</h4>
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
            placeholder="Cari Outlet"
          />
        </div>
      </section>
      <section>
        <OutletContainer
          data={filterData<Outlet>(
            outlets,
            searchTerm,
            ["name"]
          )}
        />
      </section>
    </div>
  );
};
export default withAuth(withLayout(CustomerDetailPage));
