import { Container } from "@components/general/Container";
import { ROLES } from "@constants/roles";
import { Customer } from "@models/customer/customer";
import { CsrReport } from "@models/report/CsrReport";
import { FC, use } from "react";
import styles from "../Csr.module.css";
import { CsrDetailArea } from "@models/report/CsrAnswer/CsrDetailArea";
import { CsrResultAreaFinding } from "../group/area";
import { CsrFindingAreaDetail } from "../item/detailAreaResult";

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
    // console.log(detailAreas);
    const visitationTypeOption = ["Layanan Rutin", "Single Job", "Follow Up", "Komplain", "Inspeksi", "Lainnya"];
    let areaIdCounter = 1;
    var allAreaArr = [];
    var singleAreaArr: CsrDetailArea[] =[];
    for (let i = 0; i < detailAreas.length; i++) {
      if (detailAreas[i].area.id == areaIdCounter){
        singleAreaArr.push(detailAreas[i]);
      } else {
        allAreaArr.push(singleAreaArr);
        singleAreaArr = [];
        singleAreaArr.push(detailAreas[i]);
        areaIdCounter++;
      }
    }
    allAreaArr.push(singleAreaArr);
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
                <label htmlFor="type-1">{visitationTypeOption[visitationType-1]}</label>
                </div>
            </div>
            </fieldset>
        </div>
        <CsrResultAreaFinding data={allAreaArr} />
        </section>
    </Container>
  );
};
