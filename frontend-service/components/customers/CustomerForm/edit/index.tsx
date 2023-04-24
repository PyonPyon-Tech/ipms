import { Button } from "@components/general/Button";
import { Container } from "@components/general/Container";
import { AxiosClient, URL_CUSTOMER } from "@constants/api";
import { Customer, CustomerMutation } from "@models/customer/customer";
import { CustomerFields, CustomerFormFactory } from "@models/customer/customer/form";
import { useRouter } from "next/router";
import { FC } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const CustomerEditForm: FC<{data: Customer}> = ({data})=>{
    const router = useRouter();
    const { register, handleSubmit } = useForm<CustomerFields>({
        defaultValues: CustomerFormFactory.createCustomerFields(data)
    });
    const onSubmit = async (data: CustomerFields) => {
      let customer = CustomerFormFactory.customerMutationFromData(data);

      AxiosClient.put(
        `${URL_CUSTOMER}/${router.query.id}`,
        customer
      )
        .then((response) => {
          console.log(response.data);
          toast.success("Sukses ");
          router.push("/customers");
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
          <input {...register("password")} />
          <h5>Kontak</h5>
          <input {...register("contact")} />
          <h5>Status</h5>
          <select required {...register("isActive")}>
            <option value="0">Non-Aktif</option>
            <option value="1">Aktif</option>
          </select>

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