import { ROLES } from "@constants/roles";
import { Employee } from "@models/pestcontrol/employee";
import { useRouter } from "next/router";
import { FC } from "react";

export const EmployeeCard: FC<Employee> = ({
  id,
  contact,
  address,
  user: { username, role, isActive, name },
}) => {
  const router = useRouter()
  return (
    <div
    onClick={()=>{
      router.push(`/employees/${role == 2 ? "administrators": role == 3 ? "supervisors": "technicians"}/${id}`)
    }}
      style={{ boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)" }}
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
                  <td className="pr-4">username: {username}</td>
                  <td className="hidden md:table-cell">kontak: {contact} </td>
                </tr>
                <tr>
                  <td className="pr-4">role: {ROLES[role]}</td>
                  <td className="hidden md:table-cell">address: {address}</td>
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
