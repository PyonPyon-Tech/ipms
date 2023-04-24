import { FC, useCallback, useRef } from "react";
import { useFormContext } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";
import styles from "./CsrSignature.module.css";

export const CsrFormSignatures: FC = () => {
  const technicianRef = useRef(null);
  const picRef = useRef(null);

  const { setValue } = useFormContext();
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex w-full flex-col items-center justify-center overflow-hidden">
        <h6 className="font-bold md:text-lg lg:text-[20px]">Tanda Tangan Teknisi</h6>
        <div className="relative">
          <div className="relative my-2 flex items-center rounded-xl  border-2 border-[rgb(200,200,200)] overflow-hidden">
            <SignatureCanvas
              onEnd={captureTechnicianSignature}
              ref={technicianRef}
              backgroundColor="rgb(240,240,240)"
              canvasProps={{ width: 400, height: 200 }}
            />
            <div
              className="absolute right-1/2 bottom-0 flex translate-x-1/2 cursor-pointer items-center justify-center gap-x-2 rounded-md bg-coral-dark p-2 font-bold text-white"
              onClick={() => {
                (technicianRef.current as any).clear()
                setValue("technicianSignature", null);
              }}
            >
              <p>Hapus</p>
              <img src="/icons/trash-white.svg" className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center overflow-hidden">
        <h6 className="font-bold md:text-lg lg:text-[20px]">Tanda Tangan PIC Outlet</h6>
        <div className="relative">
          <div className="relative my-2 flex items-center rounded-xl border-2 border-[rgb(200,200,200)] overflow-hidden">
            <SignatureCanvas
              onEnd={capturePicSignature}
              ref={picRef}
              backgroundColor="rgb(240,240,240)"
              canvasProps={{ width: 400, height: 200 }}
            />
            <div
              className="absolute right-1/2 bottom-0 flex translate-x-1/2 cursor-pointer items-center justify-center gap-x-2 rounded-md bg-coral-dark p-2 font-bold text-white"
              onClick={() => {
                (picRef.current as any).clear()
                setValue("picSignature", null);
              }}
            >
              <p>Hapus</p>
              <img src="/icons/trash-white.svg" className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
