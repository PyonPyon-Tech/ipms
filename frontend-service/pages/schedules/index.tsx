import { CustomerContainer } from "@components/customers/CustomerList";
import { Title } from "@components/general/Title";
import { ScheduleContainer } from "@components/schedules/ScheduleContainer";
import { AxiosClient, URL_CUSTOMER, URL_EMPLOYEE, URL_SCHEDULE } from "@constants/api";
import { filterData, filterDataNested, filterDataOnlyNested } from "@functions/filterData";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { useAuth } from "@hooks/useAuth";
import { EmployeeTechnician } from "@models/pestcontrol/employee/form";
import { Schedule, ScheduleClass } from "@models/pestcontrol/schedules";
import { User } from "@models/user";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const SearchSchedules: NextPage = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [term, setTerm] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { user } = useAuth();
  useEffect(() => {
    if (!user) return;
    async function retrieveAllSchedules() {
      const results = await Promise.all([
        AxiosClient.get(`${URL_EMPLOYEE}/supervisors/schedules`),
      ]);
      const data: Schedule[] = [];
      results.forEach((result) => {
        result.data.forEach((schedule: any) => {
          let scheduleObj = new ScheduleClass(schedule);

          data.push(scheduleObj);
        });
      });
      console.log(data);
      setSchedules(data);
    }
    retrieveAllSchedules();
  }, [user]);
  return (
    <div className="mb-4 w-full p-8 md:p-12 md:pt-0">
      <section>
        <Title
          title="Daftar Jadwal"
        >
          <h4>Total: {schedules.length} jadwal</h4>
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
            placeholder="Cari Teknisi"
          />
        </div>
      </section>
      <section>
        <ScheduleContainer
          data={filterData(schedules, searchTerm, ["technicianName"])}
        />
      </section>
    </div>
  );
};

export default withAuth(withLayout(SearchSchedules));
