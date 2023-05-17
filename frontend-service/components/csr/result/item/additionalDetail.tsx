import { FC, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { useAuth } from "@hooks/useAuth";
import { AxiosError } from "axios";
import { AxiosClient, URL_IMAGE } from "@constants/api";

export const CsrResultAdditionalDetail: FC<{
  id: number;
  recommendations: string[];
  imageUrls: string[];
  type: "detailAreas" | "detailPests";
}> = ({ id, recommendations, type, imageUrls }) => {
  const { user } = useAuth();

  const [imageUrl, setImageUrl] = useState<String>();

  let arrString: String[] = [];

  useEffect(() => {
    if (!user) return;
    async function retrieveImageDatas(imageUrls: String[]) {
      let promises: Promise<any>[] = [];
      for (let i = 0; i < imageUrls.length; i++) {
        promises.push(AxiosClient.get(`${URL_IMAGE}/${imageUrls[i]}`));
      }
      await Promise.all(promises)
        .then((responses: any[]) => {
          for (let response in responses) {
            console.log(response);
          }
        })
        .catch((err: AxiosError) => {
          toast.error(err.message);
          console.log(err);
        });
    }
    retrieveImageDatas(imageUrls);
  }, [user]);
  console.log(arrString);

  return recommendations.length != 0 ? (
    <div className="mb-2 w-0 min-w-full max-w-full">
      <div
        style={{ borderColor: "hsl(0, 0%, 80%)" }}
        className="my-2 flex w-full flex-row flex-wrap items-start justify-center gap-2 rounded-md border-2 border-solid border-[rgba(0,0,0)] bg-gray-200 p-2"
      >
        {imageUrls.length != 0 ? (
          imageUrls.map((item) => {
            return (
              <img src="data:image/jpeg;base64, /9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCADIAZADASIAAhEBAxEB/8QAHQABAAICAwEBAAAAAAAAAAAAAAcIAwYEBQkCAf/EADwQAQABAwMDAgQDBAYLAAAAAAABAgMEBQYRBwghEjEJE0FRFBUiFjJhgRgzQlJxoSMkJUNUcoKEkZLD/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APSsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcfJ1HT8OKqszOx7EUcTVN27TTxz7c8yxYutaNnVenC1bCyKueOLV+iueft4kHNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHzXXTbpmuuqKaaYmZmZ4iI+6M94dzvbxsK5Xjbq60bPw8u3PFWFRqtq/l8/aMe1NV2f5Ugk4Qdjd1+3tyVUx0y6SdVN72rk8W8vA2tdwMOufPtkalONbmPHvEz7x92aN192u6rVM6H0k2NsaiYmZu7n3Fc1PIp5/dj8Ng24t8x55/wBZ48xET9QTWwZmbh6di3c7UMuzi41mn13b165FFFFP3qqnxEf4oUq6Jdc91Tz1F7p9ex7Ff6qsHZOh4miW6ap/s/PvRk5E0xzx4uUzPv4l9YPZh2+TmWtV3ftTO35qVqYq/Gb01jL1yqqrjjmbeVcrtR/KiIB2e4e7jtp2znflWf1n2zlah/wWlZX5nk8/b5OLFyvn68ennjz7OBT3Q4mr1xRsfoX1g3PRcqmmzkWtq1aZj3I8cVRc1OvGj0zz7/wn7JV23s/aWzcKNN2htbSNDxI8Rj6bg2sW3H/TbpiHbgibD373Da1ct04Hb7peiWq6v1V7h3nZort08TPmjCsZMTVzERxFfHnnmeGa7pXc5q1NETvXpvtumaa5uRj7fzdVriqav0xTXXlY9PEU88zNE81ceIjmJlMBDdXSXrzmVzXnd1+u4vtxRpW09Hs08/8AcWL88fzY6O37ft2Kqs/u16u3Llf7049GhWKefrxTGmzx/L2TQAhO12z6lNM06h3M9bM6KrvzavVr+JYmff8ATzj4lvinz7Rx/k41faHs3Mn/AG31W6y6tT6ePRldRNUpo58efTbu0RE+Ptx/lxOoCv8Ad7E+23NtRRq+3d06nXzNVV3L3zrlddc8+88ZcRz/AIQ4N74d/Z7kzzl9I7mTPy/lc39x6tdn0c88fqyp+qxwCuUfDu7MaYiI6F6Z48edQzZ/+z8q+HZ2YV0zTPQvTOJ+2o50T/5i+scAq7qfw1+0u9jzG2tm65tTM9U1287RNy6hbvWqvvRF27ctx/6fRH+p/DQ3DbtV4+0e83q/pVmPX8i3k6hXkU2+ZmY5i3dtRPv549PPn25XiAaH0M2Bu3pf0r0LY2+eo+pb71zTLd2MvX9Qir5+XNd6u5TFU1111zFFNdNuJqrmZiiJ8e0b4AAAAAAAAAAAAAAAAAAAAAAAA6ndG7drbI0W/uPee5NM0LSsb+uzdSy7eNYt/bmuuYpif4cqQ9bvi7dE9kTf0npBoOfv/UqImmMyr1YGm0V88fv3KZu3OPM/ptxTMccV+eYC+jUt+9W+l3S3E/HdR+oW3ttWppmuj8z1G1j13Ij+5RVVFVc/wpiZedm28r4n3efcpz512ro9sjL4rpyLFi5pXrtTHvZ/ezb3NPmJmum3P0qjwsL0b+GV2/8ATvNo3P1C/MOqG6aqovX9Q3HV68aq79aqcXmaZjx7Xqrs/wAfbgN803vE2j1BovUdANgbz6oXLczbjL0zTKtP0um57emvOzvk2/ePej1+PPEslWh95HUSOdY3lsnpJptz9UY+hYlW4NVppnmJoqycqm3jUzx59VNivynTBwcHTMOzp2m4djExMaiLVmxYtxbt26IjiKaaaeIiIj6QzggL+hZ0q16v8T1Z3Fvvqdker1x+1e5sm9jUT9YpxLE2saKff9Py5hKWy+k3S3pxbpt9P+nG2dtxTT6OdK0qxi1TH15qt0xMzP1mZ5n6trAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQt3P6N3Q7i23pWhdsW5Ntbfzs3Krtaxqmr0zN3Fxppj012I9Fyn1c+rnmiavb08T5gNq6x9eOk/QPbc7o6q7ywdExqoq/DWK6vXk5dUf2LFmnmu5PmOeI4jnmqYjy88OqHxb+pO/dT/Yztd6S5FnKzKptY2ZqONOoald+02sOzzRRX/wA1V6PPt9U4bK+Fp031DVrm9O5LqJunqxunM9NWXezM67i41Ux7U801zfqiI/TH+liOI8Ux7Ranpp0W6T9HMC5pvS/p9oe27V7+uqwcSmi7e8/7y75rufT96qeOIB5ibY7AO9Dus17H3t3QdQszb+BcmblNOsX/AMXnUUVeZpsYNuYtY1M+00zNuaf7k+y9PQHsN7cu3mrH1XbW0fzvcePxVGva7VTlZdFX3tU8RasTHnibdFNXHiapWHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/Z" />
            );
          })
        ) : (
          <h2>Tidak ada foto</h2>
        )}
      </div>
      <p className="mb-1 text-sm font-medium md:text-base lg:text-lg">Rekomendasi Tindakan:</p>
      <div
        style={{ borderColor: "hsl(0, 0%, 80%)" }}
        className="my-2 flex w-full flex-col items-center justify-center rounded-md border-2 border-solid border-[rgba(230,230,230)] p-2"
      >
        {recommendations.map((item) => {
          return (
            <div
              style={{ borderColor: "hsl(0, 0%, 80%)" }}
              className="my-2 flex w-full flex-col items-start justify-center rounded-md border-2 border-solid border-[rgba(0,0,0)] bg-gray-200 p-2"
            >
              <h2>{item}</h2>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="mb-2 w-0 min-w-full max-w-full">
      <div
        style={{ borderColor: "hsl(0, 0%, 80%)" }}
        className="my-2 flex w-full flex-row flex-wrap items-start justify-center gap-2 rounded-md border-2 border-solid border-[rgba(0,0,0)] bg-gray-200 p-2"
      >
        {imageUrls.length != 0 ? (
          imageUrls.map((item) => {
            return (
              <img src="data:image/jpeg;base64, /9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCADIAZADASIAAhEBAxEB/8QAHQABAAICAwEBAAAAAAAAAAAAAAcIAwYEBQkCAf/EADwQAQABAwMDAgQDBAYLAAAAAAABAgMEBQYRBwghEjEJE0FRFBUiFjJhgRgzQlJxoSMkJUNUcoKEkZLD/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APSsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcfJ1HT8OKqszOx7EUcTVN27TTxz7c8yxYutaNnVenC1bCyKueOLV+iueft4kHNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHzXXTbpmuuqKaaYmZmZ4iI+6M94dzvbxsK5Xjbq60bPw8u3PFWFRqtq/l8/aMe1NV2f5Ugk4Qdjd1+3tyVUx0y6SdVN72rk8W8vA2tdwMOufPtkalONbmPHvEz7x92aN192u6rVM6H0k2NsaiYmZu7n3Fc1PIp5/dj8Ng24t8x55/wBZ48xET9QTWwZmbh6di3c7UMuzi41mn13b165FFFFP3qqnxEf4oUq6Jdc91Tz1F7p9ex7Ff6qsHZOh4miW6ap/s/PvRk5E0xzx4uUzPv4l9YPZh2+TmWtV3ftTO35qVqYq/Gb01jL1yqqrjjmbeVcrtR/KiIB2e4e7jtp2znflWf1n2zlah/wWlZX5nk8/b5OLFyvn68ennjz7OBT3Q4mr1xRsfoX1g3PRcqmmzkWtq1aZj3I8cVRc1OvGj0zz7/wn7JV23s/aWzcKNN2htbSNDxI8Rj6bg2sW3H/TbpiHbgibD373Da1ct04Hb7peiWq6v1V7h3nZort08TPmjCsZMTVzERxFfHnnmeGa7pXc5q1NETvXpvtumaa5uRj7fzdVriqav0xTXXlY9PEU88zNE81ceIjmJlMBDdXSXrzmVzXnd1+u4vtxRpW09Hs08/8AcWL88fzY6O37ft2Kqs/u16u3Llf7049GhWKefrxTGmzx/L2TQAhO12z6lNM06h3M9bM6KrvzavVr+JYmff8ATzj4lvinz7Rx/k41faHs3Mn/AG31W6y6tT6ePRldRNUpo58efTbu0RE+Ptx/lxOoCv8Ad7E+23NtRRq+3d06nXzNVV3L3zrlddc8+88ZcRz/AIQ4N74d/Z7kzzl9I7mTPy/lc39x6tdn0c88fqyp+qxwCuUfDu7MaYiI6F6Z48edQzZ/+z8q+HZ2YV0zTPQvTOJ+2o50T/5i+scAq7qfw1+0u9jzG2tm65tTM9U1287RNy6hbvWqvvRF27ctx/6fRH+p/DQ3DbtV4+0e83q/pVmPX8i3k6hXkU2+ZmY5i3dtRPv549PPn25XiAaH0M2Bu3pf0r0LY2+eo+pb71zTLd2MvX9Qir5+XNd6u5TFU1111zFFNdNuJqrmZiiJ8e0b4AAAAAAAAAAAAAAAAAAAAAAAA6ndG7drbI0W/uPee5NM0LSsb+uzdSy7eNYt/bmuuYpif4cqQ9bvi7dE9kTf0npBoOfv/UqImmMyr1YGm0V88fv3KZu3OPM/ptxTMccV+eYC+jUt+9W+l3S3E/HdR+oW3ttWppmuj8z1G1j13Ij+5RVVFVc/wpiZedm28r4n3efcpz512ro9sjL4rpyLFi5pXrtTHvZ/ezb3NPmJmum3P0qjwsL0b+GV2/8ATvNo3P1C/MOqG6aqovX9Q3HV68aq79aqcXmaZjx7Xqrs/wAfbgN803vE2j1BovUdANgbz6oXLczbjL0zTKtP0um57emvOzvk2/ePej1+PPEslWh95HUSOdY3lsnpJptz9UY+hYlW4NVppnmJoqycqm3jUzx59VNivynTBwcHTMOzp2m4djExMaiLVmxYtxbt26IjiKaaaeIiIj6QzggL+hZ0q16v8T1Z3Fvvqdker1x+1e5sm9jUT9YpxLE2saKff9Py5hKWy+k3S3pxbpt9P+nG2dtxTT6OdK0qxi1TH15qt0xMzP1mZ5n6trAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQt3P6N3Q7i23pWhdsW5Ntbfzs3Krtaxqmr0zN3Fxppj012I9Fyn1c+rnmiavb08T5gNq6x9eOk/QPbc7o6q7ywdExqoq/DWK6vXk5dUf2LFmnmu5PmOeI4jnmqYjy88OqHxb+pO/dT/Yztd6S5FnKzKptY2ZqONOoald+02sOzzRRX/wA1V6PPt9U4bK+Fp031DVrm9O5LqJunqxunM9NWXezM67i41Ux7U801zfqiI/TH+liOI8Ux7Ranpp0W6T9HMC5pvS/p9oe27V7+uqwcSmi7e8/7y75rufT96qeOIB5ibY7AO9Dus17H3t3QdQszb+BcmblNOsX/AMXnUUVeZpsYNuYtY1M+00zNuaf7k+y9PQHsN7cu3mrH1XbW0fzvcePxVGva7VTlZdFX3tU8RasTHnibdFNXHiapWHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/Z" />
            );
          })
        ) : (
          <h2>Tidak ada foto</h2>
        )}
      </div>
      <p className="mb-1 text-sm font-medium md:text-base lg:text-lg">Rekomendasi Tindakan:</p>
      <div
        style={{ borderColor: "hsl(0, 0%, 80%)" }}
        className="my-2 flex w-full flex-col items-center justify-center rounded-md border-2 border-solid border-[rgba(0,0,0)] p-2"
      >
        <h2>Tidak ada rekomendasi tindakan.</h2>
      </div>
    </div>
  );
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};
