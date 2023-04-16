import { Title } from "@components/general/Title";
import { PesticideContainer } from "@components/inventories/outList";
import { PesticideCard } from "@components/inventories/outList/PesticideCard";
import { ScheduleContainer } from "@components/schedules/ScheduleContainer";
import { AxiosClient, URL_CUSTOMER, URL_EMPLOYEE, URL_INVENTORY, URL_SCHEDULE } from "@constants/api";
import { filterData, filterDataNested, filterDataOnlyNested } from "@functions/filterData";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { useAuth } from "@hooks/useAuth";
import { Pesticide, PesticideClass } from "@models/pestcontrol/Pesticide";
import { EmployeeTechnician } from "@models/pestcontrol/employee/form";
import { Schedule, ScheduleClass } from "@models/pestcontrol/schedules";
import { User } from "@models/user";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SearchInventory: NextPage = () => {

  const [cart, setCart] = useState<Map<number, number>>(new Map<number, number>);
  const [pesticides, setPesticide] = useState<Pesticide[]>([]);
  const [term, setTerm] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter()
  const klik = ()=>{
    router.push("/reports"+id+jssj)
  }
  const { user } = useAuth();
  useEffect(() => {
    if (!user) return;
    async function retrieveAllPesticide() {
      const results = await Promise.all([
        AxiosClient.get(`${URL_INVENTORY}/pesticides`),
      ]);
      const data: Pesticide[] = [];
      results.forEach((result) => {
        result.data.forEach((pesticide: any) => {
          let pesticideObj = new PesticideClass(pesticide);
          data.push(pesticideObj);
        });
      });
      console.log(data);
      setPesticide(data);
    }
    retrieveAllPesticide();
  }, [user]);
  return (
<div className="mb-4 w-full p-8 md:p-12 md:pt-0">
      <section>
        <Title
          title="Daftar Pestisida"
        >
          <h4>Total: {pesticides.length} pestisida</h4>
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
            placeholder="Cari Pestisida"
          />
        </div>
        <button className={`text-xs md:text-base font-semibold py-1 text-white rounded-md text-center px-3 bg-teal`}
          onClick={() => {
            console.log(cart);
          }}>
          keranjang
        </button>
      </section>
      <section>
        <PesticideContainer
          data={filterData<Pesticide>(
            pesticides,
            searchTerm,
            ["name", "activeIngredient"]
          )}
          cart = {cart}
          setCart = {setCart}
        />
      </section>
    </div>
  );
};

export default withAuth(withLayout(SearchInventory));
