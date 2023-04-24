import { MyOption } from "@components/assignments/TechnicianOutletDetailForm";
import { useCsrForm } from "@hooks/useCsrForm";
import { useRouter } from "next/router";
import { FC } from "react";
import { useForm, useFormContext } from "react-hook-form";
import Select from "react-select";
import styles from "./Csr.module.css";

export const CsrFormHead: FC = () => {
  const { initialData, getInitialData } = useCsrForm();
  const router = useRouter();
  const allOutlets = initialData?.outlets ?? [];
  const disabled = allOutlets.length == 0;
  const placeholder = disabled ? "Pilih Tanggal Terlebih Dahulu" : "Pilih Outlet";
  const { register, control } = useFormContext();
  return (
    <section className={styles.csrFormHead}>
      <div className="csr-form-head">
        <label htmlFor="date">
          <img src="/icons/calendar.svg" />
          <p>Tanggal Layanan</p>
        </label>
        <input
          {...register("date", {
            onChange: (e) => {
              getInitialData(router.query.technician, new Date(e.target.value));
            },
          })}
          type="date"
          id="date"
        />
      </div>
      <div className="csr-form-head">
        <label htmlFor="outlet">
          <img src="/icons/store.svg" className="h-5 w-5" alt="" />
          <p>Outlet</p>
        </label>
        <select {...register("outlet")} placeholder={placeholder} id="outlet" className="w-full max-w-[400px] pr-2">
          <option value="" disabled selected>
            {placeholder}
          </option>
          {allOutlets.map(({ id, name }) => (
            <option key={`outlet-${id}`} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="csr-form-head flex w-full gap-x-4 sm:w-3/4 md:w-3/5 xl:w-2/5">
        <div className="w-1/2">
          <label htmlFor="start">
            <img src="/icons/clock.svg" className="scale-75" />
            <p>Waktu Mulai</p>
          </label>
          <input
            {...register("start")}
            defaultValue={new Date().toLocaleTimeString("en-ID", { hour: "2-digit", minute: "2-digit", hour12: false })}
            id="start"
            type="time"
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="end">
            <img src="/icons/clock.svg" />
            <p>Waktu Selesai</p>
          </label>
          <input
            defaultValue={new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}
            {...register("end")}
            id="end"
            type="time"
          />
        </div>
      </div>

      <div className="csr-form-head w-full sm:w-3/4 lg:w-1/2">
        <fieldset>
          <label>Jenis Layanan</label>
          <div className="grid grid-cols-3">
            <div>
              <input {...register("type")} type="radio" id="type-1" value="1" />
              <label htmlFor="type-1">Layanan Rutin</label>
            </div>
            <div>
              <input {...register("type")} type="radio" id="type-2" value="2" />
              <label htmlFor="type-2">Single Job</label>
            </div>
            <div>
              <input {...register("type")} type="radio" id="type-3" value="3" />
              <label htmlFor="type-3">Follow Up</label>
            </div>
            <div>
              <input {...register("type")} type="radio" id="type-4" value="4" />
              <label htmlFor="type-4">Komplain</label>
            </div>
            <div>
              <input {...register("type")} type="radio" id="type-5" value="5" />
              <label htmlFor="type-5">Inspeksi</label>
            </div>
            <div>
              <input {...register("type")} type="radio" id="type-6" value="6" />
              <label htmlFor="type-6">Lainnya</label>
            </div>
          </div>
        </fieldset>
      </div>
    </section>
  );
};
