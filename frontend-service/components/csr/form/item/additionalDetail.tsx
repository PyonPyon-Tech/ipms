import { FC, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";

export const CsrFormAdditionalDetail: FC<{
  id: number;
  yes: boolean;
  recommendations: string[];
  type: "detailAreas" | "detailPests";
}> = ({ id, yes, recommendations, type }) => {
  const namepath = `${type}.${id}`;
  const { control, register, setValue } = useFormContext();
  const [files, setFiles] = useState<any[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 1048576 * 8,
    maxFiles: 3,
    onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length > 0) {
        toast.error(`Maksimal 3 foto dan 8 MB per foto`);
        return;
      }
      const renamedAcceptedFiles = acceptedFiles.map(
        (file, index) => new File([file], `${type}-${id}-${index}-${file.name}`, { type: file.type })
      );
      setValue(`${namepath}.images`, renamedAcceptedFiles);
      setFiles(
        renamedAcceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const thumbs = files.map((file) => (
    <div
      className="max-h[150px] flex w-[100px] items-center justify-center p-1 md:max-h-[150px] md:w-[150px]"
      key={file.name}
    >
      <div className="flex min-w-0 overflow-hidden">
        <img
          src={file.preview}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <>
      <div className={`mb-2 w-0 min-w-full max-w-full ${!yes && "hidden"}`}>
        <p className="mb-1 text-sm font-medium md:text-base lg:text-lg">Rekomendasi Tindakan:</p>
        <Controller
          name={`${namepath}.recommendation`}
          control={control}
          render={({ field }) => (
            <CreatableSelect
              {...field}
              isMulti
              autoFocus
              isSearchable
              placeholder="Pilih..."
              formatCreateLabel={(inputValue: string) => `Tambahkan "${inputValue}"`}
              options={recommendations.map((r) => {
                return {
                  value: r,
                  label: r,
                };
              })}
            />
          )}
        />
      </div>
      <div className=" w-0 min-w-full">
        <Controller
          name={`${namepath}.images`}
          control={control}
          render={({ field }) => (
            <div
              style={{ borderColor: "hsl(0, 0%, 80%)" }}
              className={`my-2 flex w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-[rgba(230,230,230)] bg-gray-200 p-2 ${
                !yes && "hidden"
              }`}
            >
              {files.length > 0 && (
                <aside className="my-3 flex flex-row flex-wrap gap-4 overflow-hidden">{thumbs}</aside>
              )}
              <div {...field} {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p className="rounded-md bg-teal p-2 text-xs font-semibold text-white md:text-base transition-all hover:cursor-pointer">
                  <span>Unggah atau Ubah Foto</span>
                </p>
              </div>
            </div>
          )}
        />
      </div>
    </>
  );
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};
