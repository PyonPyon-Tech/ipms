import { FC, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FileRejection, useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

export const CsrFormVisitationPhoto: FC = () => {
  const { control, register, setValue } = useFormContext();
  const [files, setFiles] = useState<any[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 1048576 * 8,
    maxFiles: 1,
    onDrop: (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      console.log(fileRejections)
      if (fileRejections.length > 0) {
        toast.error(`Maksimal 1 foto dan 8 MB per foto`);
        return;
      }
      const renamedAcceptedFiles = acceptedFiles.map(
        (file, index) => new File([file], `visitationPhoto-${index}-${file.name}`, { type: file.type })
      );
      setValue(`visitationPhoto`, renamedAcceptedFiles);
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
    <div className="my-8 flex w-0 min-w-full flex-col items-center">
      <p className="font-bold md:text-lg lg:text-[20px]">Foto Kunjungan</p>
      <Controller
        name={`visitationPhoto`}
        control={control}
        render={({ field }) => (
          <div
            style={{ borderColor: "hsl(0, 0%, 80%)" }}
            className={`my-2 flex w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-[rgba(230,230,230)] bg-gray-200 p-4`}
          >
            {files.length > 0 && <aside className="my-3 flex flex-row flex-wrap gap-4 overflow-hidden">{thumbs}</aside>}
            <div {...field} {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <p className="rounded-md bg-teal px-3 py-2 text-sm font-semibold text-white transition-all hover:cursor-pointer md:text-base">
                <span>Unggah atau Ubah Foto</span>
              </p>
            </div>
          </div>
        )}
      />
    </div>
  );
};
