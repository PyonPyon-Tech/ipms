import { AxiosClient, URL_INVENTORY } from "@constants/api";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { TargetPestContainer } from "./targetPest";
import { Pest } from "@models/pestcontrol/Pest";
import { formatInventoryForm, validateInventoryForm } from "./helper";
import { Button } from "@components/general/Button";

export const InventoryForm: FC<{}> = ({}) => {
  const router = useRouter();
  const methods = useForm({
    defaultValues: {
      target: [{}],
    } as any,
  });
  const { register, handleSubmit } = methods;
  const [pestData, setPestData] = useState<Pest[]>(defaultPest); // TODO: Dapatkan data hama dari BE. By default, array kosong '[]'

  const onSubmit = async (data: any) => {
    console.log(data);
    const validationError = validateInventoryForm(data, pestData);
    if (validationError) {
      toast.error(validationError);
      return;
    }
    const [targets, targetPests] = formatInventoryForm(data, pestData);
    const submittedData = {
      name: data.name,
      stock: Number(data.stock),
      activeIngredient: data.activeIngredient,
      unit: data.unit,
      targets: targets,
      targetPests: targetPests,
    };
    console.log(submittedData);
    const loading = toast.loading("Menyimpan...");
    AxiosClient.post(`${URL_INVENTORY}/pesticides`, submittedData)
      .then((response) => {
        console.log(response.data);
        toast.success("Sukses menambahkan pestisida", {
          duration: 5000,
        });
        router.push(`/inventories/${response.data.id}`);
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      })
      .finally(() => {
        toast.dismiss(loading);
      });
  };
  if (!pestData || pestData.length == 0) return <div></div>;
  return (
    <div className="mt-4 w-full flex-col justify-evenly rounded-md p-4 pb-5 align-middle shadow-basic">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex-col">
          <h5 className="text-base font-bold">Nama Chemical</h5>
          <input required {...register("name")} />
          <h5 className="text-base font-bold">Bahan Aktif</h5>
          <input required {...register("activeIngredient")} />
          <h5 className="text-base font-bold">Stok</h5>
          <input type="number" {...register("stock")} required />
          <h5 className="text-base font-bold">Satuan dosis</h5>
          <select className="max-w-[400px]" required {...register("unit")}>
            <option value="ml">Mililiter/ML</option>
            <option value="gram">Gram/GR</option>
            <option value="butir">Butir</option>
            <option value="trap">Trap</option>
            <option value="titik">Titik</option>
          </select>
          <TargetPestContainer pestData={pestData} />
          <Button action={{ name: "Simpan", submit:true }}></Button>

        </form>
      </FormProvider>
    </div>
  );
};

const defaultPest: Pest[] = [
  {
    id: 1,
    name: "Larva Nyamuk",
  },
  {
    id: 2,
    name: "Lalat",
  },
  {
    id: 3,
    name: "Tikus Rumah",
  },
  {
    id: 4,
    name: "Lalat (Musca)",
  },
  {
    id: 5,
    name: "Nyamuk (Anopheles)",
  },
];
