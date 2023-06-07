import { Container } from "@components/general/Container";
import { ROLES } from "@constants/roles";
import { Customer } from "@models/customer/customer";
import { FC, use } from "react";

const MONTHS: string[] = [`Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`];

export const CustomerDetail: FC<Customer> = ({
  id,
  contact,
  visitationFrequency,
  startContract,
  endContract,
  user: { isActive, name, role, username },
}) => {
  return (
    <Container>
      <img
        src="/icons/account.svg"
        className="w-1/4 min-w-[120px] md:max-w-[400px]"
      />
      <div className="mt-8 flex w-full flex-col justify-evenly md:mt-0 md:flex-row">
        <div className="employee-detail w-full md:w-2/5">
          <h5>Nama Customer</h5>
          <p>{name}</p>
          <h5>Username</h5>
          <p>{username}</p>
          <h5>Kontak</h5>
          <p>{contact}</p>
        </div>
        <div className="employee-detail w-full md:w-2/5">
          <h5>Jumlah Kunjungan</h5>
          <p>{visitationFrequency}x Sebulan</p>
          <h5>Kontrak</h5>
          <p>{new Date(endContract).getDate()} {MONTHS[new Date(startContract).getMonth()]} {new Date(startContract).getFullYear()} 
             {} - {new Date(endContract).getDate()} {MONTHS[new Date(endContract).getMonth()]} {new Date(endContract).getFullYear()}</p>
        </div>
      </div>
    </Container>
  );
};
