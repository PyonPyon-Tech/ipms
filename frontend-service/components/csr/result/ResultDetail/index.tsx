import { Container } from "@components/general/Container";
import { ROLES } from "@constants/roles";
import { Customer } from "@models/customer/customer";
import { CsrReport } from "@models/report/CsrReport";
import { FC, use } from "react";
import styles from "../Csr.module.css";

export const CsrReportDetail: FC<CsrReport> = ({
  id,
  reportType,
  visitationType,
  feedback,
  period,
  technician,
  outlet,
  date,
  start,
  end,
  technicianSignature,
  picSignature,
  visitationPhoto,
  detailAreas,
  detailPests,
  pesticideUsages,
}) => {
    console.log(id);
    console.log(detailAreas);
    console.log(visitationType);
    console.log(feedback);
    console.log(reportType);
    console.log(period);
    console.log(technician);
    console.log(outlet);
    console.log(date);
    console.log(start);
    console.log(end);
    console.log(technicianSignature);
    console.log(picSignature);
    console.log(visitationPhoto);
    console.log(detailPests);
    console.log(pesticideUsages);

  return (
    <Container>
      <section className={styles.csrFormHead}>
        <div className="csr-form-head">
            <label htmlFor="date">
            <img src="/icons/calendar.svg" />
            <p>Tanggal Layanan</p>
            </label>
            <h2>{date}</h2>
        </div>
        <div className="csr-form-head">
            <label htmlFor="outlet">
            <img src="/icons/store.svg" className="h-5 w-5" alt="" />
            <p>Outlet</p>
            </label>
            <h2>{outlet.name}</h2>
        </div>

        <div className="csr-form-head flex w-full gap-x-4 sm:w-3/4 md:w-3/5 xl:w-2/5">
            <div className="w-1/2">
            <label htmlFor="start">
                <img src="/icons/clock.svg" className="scale-75" />
                <p>Waktu Mulai</p>
            </label>
            <h2>{start}</h2>
            </div>
            <div className="w-1/2">
            <label htmlFor="end">
                <img src="/icons/clock.svg" />
                <p>Waktu Selesai</p>
            </label>
            <h2>{end}</h2>
            </div>
        </div>

        <div className="csr-form-head w-full sm:w-3/4 lg:w-1/2">
            <fieldset>
            <label>Jenis Layanan</label>
            <div className="grid grid-cols-3">
                <div>
                <input checked disabled type="radio" id="type-1" value="1" />
                <label htmlFor="type-1">L{visitationType}</label>
                </div>
            </div>
            </fieldset>
        </div>
        </section>
    </Container>
  );
};
