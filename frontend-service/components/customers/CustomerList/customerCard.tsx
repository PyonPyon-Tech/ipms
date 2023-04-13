import { ROLES } from "@constants/roles";
import { Customer } from "@models/customer/customer";
import { useRouter } from "next/router";
import { FC } from "react";

export const CustomerCard: FC<Customer> = ({
  id,
  user: { username, role, isActive, name },
  outlets
}) => {
  console.log(outlets);
  const router = useRouter()
  return (
    <div
    onClick={()=>{
      router.push(`/customers/${id}`)
    }}
      style={{ boxShadow: " 0px 0px 5px 0px rgba(197, 197, 197, 1)"}}
      className="mb-4 cursor-pointer rounded-lg py-2 px-4 md:py-4 md:px-12 flex justify-between items-center w-full"
    >
      <div className="flex items-center gap-x-3 sm:gap-x-6 md:gap-x-8">
        <img
          className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16"
          src="/icons/person.svg"
        />
        <div className="">
          <h5 className="font-bold text-sm md:text-xl md:mb-1">{name}</h5>
          <div>
            <table className="table-auto font-medium text-xs md:text-sm">
              <tbody>
                <tr>
                  <td className="pr-4">Username: {username}</td>
                  <td className="hidden md:table-cell">Jumlah Outlet: {outlets.length}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div
        className={`text-xs md:text-base font-semibold py-1 text-white rounded-md text-center px-3 ${
          isActive ? "bg-teal" : "bg-coral"
        }`}
      >
        {isActive ? "Aktif" : "Non-Aktif"}
      </div>
    </div>
  );
};
