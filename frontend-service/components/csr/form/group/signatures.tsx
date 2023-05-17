import { FC, useCallback, useRef } from "react";
import { useFormContext } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";
import styles from "./CsrSignature.module.css";
import { Button } from "@components/general/Button";

export const CsrFormSignatures: FC<{ technicianName:String }> = ({ technicianName })  => {
  const technicianRef = useRef(null);
  const picRef = useRef(null);

  const { register, setValue } = useFormContext();
  const captureTechnicianSignature = useCallback(async () => {
    if (!technicianRef.current) return;
    const imageSrc = (technicianRef.current as any).toDataURL("image/jpeg");
    const blob = await fetch(imageSrc).then((res) => res.blob());
    const file = new File([blob], "technicianSignature.jpeg", {
      type: "image/jpeg",
      lastModified: new Date().getTime(),
    });
    setValue("technicianSignature", file);
  }, [technicianRef]);

  const capturePicSignature = useCallback(async () => {
    if (!picRef.current) return;
    const imageSrc = (picRef.current as any).toDataURL("image/jpeg");
    const blob = await fetch(imageSrc).then((res) => res.blob());
    const file = new File([blob], "picSignature.jpeg", {
      type: "image/jpeg",
      lastModified: new Date().getTime(),
    });
    setValue("picSignature", file);
  }, [picRef]);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="flex w-full flex-col items-center justify-center overflow-hidden">
        <h6 className="font-bold md:text-lg lg:text-[20px]">
          Tanda Tangan Teknisi
        </h6>
        <div className="relative">
          <div className="relative my-2 flex items-center overflow-hidden  rounded-xl border-2 border-[rgb(200,200,200)]">
            <SignatureCanvas
              onEnd={captureTechnicianSignature}
              ref={technicianRef}
              backgroundColor="rgb(240,240,240)"
              canvasProps={{ width: 400, height: 200 }}
            />
            <div className="absolute right-1/2 bottom-2 flex translate-x-1/2">
              <Button
                className="bg-coral"
                action={{
                  name: "Hapus",
                  func: () => {
                    (technicianRef.current as any).clear();
                    setValue("technicianSignature", null);
                  },
                }}
                img="/icons/trash-white.svg"
              ></Button>
            </div>
          </div>
        </div>
        <p className="font-bold md:text-lg lg:text-[16px]">
          {technicianName}
        </p>
      </div>

      <div className="flex w-full flex-col items-center justify-center overflow-hidden">
        <h6 className="font-bold md:text-lg lg:text-[20px]">
          Tanda Tangan PIC Outlet
        </h6>
        <div className="relative">
          <div className="relative my-2 flex items-center overflow-hidden rounded-xl border-2 border-[rgb(200,200,200)]">
            <SignatureCanvas
              onEnd={capturePicSignature}
              ref={picRef}
              backgroundColor="rgb(240,240,240)"
              canvasProps={{ width: 400, height: 200 }}
            />
            <div className="absolute right-1/2 bottom-2 flex translate-x-1/2">
              <Button
                className="bg-coral"
                action={{
                  name: "Hapus",
                  func: () => {
                    (picRef.current as any).clear();
                    setValue("picSignature", null);
                  },
                }}
                img="/icons/trash-white.svg"
              ></Button>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-center">
          <input className="text-center flex w-full items-center justify-center rounded-md border-2 " id="picName" placeholder="Nama PIC Outlet" required {...register("picName")} />
        </div>
      </div>
    </div>
  );
};
