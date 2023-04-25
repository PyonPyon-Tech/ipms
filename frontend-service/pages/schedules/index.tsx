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
import { useRouter } from "next/router";

const SearchSchedules: NextPage = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [term, setTerm] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    async function retrieveAllSchedules() {
      let requestParams = ``;

      switch (router.pathname) {
        case `/schedules/allocate`:
          requestParams = `?approval=1`;
          setTitle("Daftar Jadwal Disetujui");
          break;
        case `/schedules/approve`:
          requestParams = `?approval=0`;
          setTitle("Daftar Jadwal Belum Disetujui");
          break;
        default:
          setTitle("Daftar Jadwal");
      }

      const result = await AxiosClient.get(`${URL_EMPLOYEE}/supervisors/schedules${requestParams}`);

      const data: Schedule[] = [];

      result.data.forEach((schedule: any) => {
        console.log(`sche ${schedule.id}`);
        let scheduleObj = new ScheduleClass(schedule);

        data.push(scheduleObj);
      });

      setSchedules(data);
    }
    retrieveAllSchedules();
  }, [user, router]);
  return (
    <div className="mb-4 w-full md:pt-0">
      <section>
        <Title
          title={title}
        >
          <h4>Total: {schedules.length} jadwal</h4>
        </Title>
        <div className="relative w-4/5 max-w-[500px] mb-4">
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
            className="w-full rounded-md border border-[#1E1E1E] py-2 pl-10 pr-4 font-normal"
            placeholder="Cari Teknisi"
          />
        </div>
      </section>
      <section>
        <ScheduleContainer
          data={filterData(schedules, searchTerm, ["technicianName"])}
          pathname={router.pathname}
        />
      </section>
    </div>
  );
};

export default withAuth(withLayout(SearchSchedules));
