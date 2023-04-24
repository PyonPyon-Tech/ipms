import { Button } from "@components/general/Button";
import { Container } from "@components/general/Container";
import { AxiosClient, URL_CUSTOMER } from "@constants/api";
import { CustomerMutation } from "@models/customer/customer";
import {
  CustomerFields,
  CustomerFormFactory,
} from "@models/customer/customer/form";
import { useRouter } from "next/router";
import { FC } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const CustomerForm: FC<{ }> = ({
}) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<CustomerFields>();
  const onSubmit = async (data: CustomerFields) => {
    let customer: CustomerMutation | null = null;
    let role: string = "customer";

    customer = CustomerFormFactory.customerMutationFromData(data);

    AxiosClient.post(
      `${URL_CUSTOMER}`,
      customer
    )
      .then((response) => {
        console.log(response.data);
        toast.success("Sukses membuat "+role, {
          duration: 5000
        });
        router.push(`/customers/${response.data.id}`);
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  };
  return (
    <Container className="justify-evenly gap-x-10">
      <img
        src="/icons/account.svg"
        className="w-1/4 max-w-[200px] md:max-w-[400px]"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="detail-form">
        <h5>Nama Customer</h5>
        <input required {...register("name")} />
        <h5>Username</h5>
        <input required {...register("username")} />
        <h5>Password</h5>
        <input required {...register("password")} />
        <h5>Kontak</h5>
        <input required {...register("contact")} />
        <h5>Jumlah Kunjungan</h5>
        <div className="relative">
          <input required type="number" min={0} className="pr-10" {...register("visitationFrequency")} />
          <span className="absolute top-0 right-0 h-full flex items-center text-gray-400 text-sm mr-2 select-none">
            x sebulan
          </span>
        </div>
        <h5>Kontrak</h5>
        <div className="flex max-w-[400px] justify-between gap-x-2 md:gap-x-4">
            <input required placeholder="Start" type="date" {...register("startContract")} />
            <input required placeholder="End" type="date" {...register("endContract")} />
        </div>
        
        <Button
            action={{
                name: `Submit`,
                submit: true,
                func: () => {}
            }}
        ></Button>
      </form>
    </Container>
  );
};