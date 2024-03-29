import { Title } from "@components/general/Title";
import { TitleInventoryOut } from "@components/inventories/outList/TitleInvOut";
import { PesticideContainer } from "@components/inventories/outList";
import { PesticideCard } from "@components/inventories/outList/PesticideCard";
import { ScheduleContainer } from "@components/schedules/ScheduleContainer";
import {
  AxiosClient,
  URL_CUSTOMER,
  URL_EMPLOYEE,
  URL_INVENTORY,
  URL_SCHEDULE,
} from "@constants/api";
import {
  filterData,
  filterDataNested,
  filterDataOnlyNested,
} from "@functions/filterData";
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
import toast from "react-hot-toast";

const SearchInventory: NextPage = () => {
  const [isCart, setIsCart] = useState(false);
  const [cart, setCart] = useState<Map<number, number>>(
    new Map<number, number>()
  );
  const [pesticides, setPesticide] = useState<Pesticide[]>([]);
  const [term, setTerm] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();
  const { user } = useAuth();

  const onSubmit = async () => {
    const pestisidePostDataLst: object[] = [];
    cart.forEach((jml, id) => {
      if (jml > 0) {
        const payload = {
          pesticide: { id: id },
          requester: { id: user?.id },
          amount: jml,
        };
        pestisidePostDataLst.push(payload);
      }
    });
    const loading = toast.loading("Menyimpan...");
    console.log(pestisidePostDataLst);
    AxiosClient.post(
      `${URL_INVENTORY}/pesticide-requests`,
      pestisidePostDataLst
    )
      .then((response) => {
        console.log(response.data);
        toast.success("Pengambilan Sukses", {
          duration: 5000,
        });
        window.location.reload();
        router.push(`/inventories/out`);
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      })
      .finally(() => {
        toast.dismiss(loading);
      });
  };

  function countCart() {
    return Array.from(cart.entries()).filter(([key, value]) => value > 0)
      .length;
  }
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
    if (user.role != 4) {
      router.push("/");
    } else {
      retrieveAllPesticide();
    }
  }, [user]);
  return (
    <div className="mb-4 w-full">
      <section>
        {isCart ? (
          <TitleInventoryOut
            title="Keranjang Pengambilan"
            isCart={{
              func: () => {
                setIsCart(false);
              },
            }}
            action={{
              name: "Submit",
              func: () => {
                onSubmit();
              },
            }}
          >
            <h4>Total: {countCart()} pestisida</h4>
          </TitleInventoryOut>
        ) : (
          <div>
            <TitleInventoryOut
              title="Pengambilan Pestisida"
              action={{
                name: "Keranjang",
                func: () => {
                  setIsCart(true);
                },
              }}
            >
              <h4>Total: {pesticides.length} pestisida</h4>
            </TitleInventoryOut>
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
                    setSearchTerm(term);
                  }
                }}
                className="w-full rounded-lg border border-[#1E1E1E] py-2 pl-10 pr-4 font-normal"
                placeholder="Cari Pestisida"
              />
            </div>
          </div>
        )}
      </section>
      <section>
        <PesticideContainer
          data={filterData<Pesticide>(pesticides, searchTerm, [
            "name",
            "activeIngredient",
          ])}
          isCart={isCart}
          cart={cart}
          setCart={setCart}
        />
      </section>
    </div>
  );
};

export default withAuth(withLayout(SearchInventory));
