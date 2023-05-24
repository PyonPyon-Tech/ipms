import { Container } from "@components/general/Container";
import { CsrReport } from "@models/report/CsrReport";
import { FC, useEffect, useState } from "react";
import React from 'react';
import styles from "../Csr.module.css";
import { CsrDetailArea } from "@models/report/CsrAnswer/CsrDetailArea";
import { CsrResultAreaFinding } from "../group/area";
import { CsrResultPestFinding } from "../group/pest";
import { CsrResultPesticideUsage } from "../group/pesticide";
import { CsrResultSignatures } from "../group/signatures";
import { CsrResultVisitationPhoto } from "../item/visitationPhoto";
import { Title } from "@components/general/Title";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import moment from "moment";
import "moment/locale/id";
import { Button } from "@components/general/Button";
import { toast } from "react-hot-toast";
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import PDFFile from "./pdfTemplate";
import { useAuth } from "@hooks/useAuth";
import { AxiosClient, URL_IMAGE } from "@constants/api";
import { AxiosError } from "axios";


export const CsrReportDetail: FC<CsrReport> = ({
  id,
  reportType,
  visitationType,
  feedback,
  period,
  technician,
  outlet,
  date,
  picName,
  time,
  technicianSignature,
  picSignature,
  visitationPhoto,
  detailAreas,
  detailPests,
  pesticideUsages,
}) => {
  // console.log(detailAreas);
  const signature = [technicianSignature, picSignature];

  const { user } = useAuth();

  const [imageDatas, setImageDatas] = useState<String[]>();

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
          console.log(responses);
          responses.map((response) => {
            console.log(response.data);
            arrString.push(response.data);
            setImageDatas(arrString);
            console.log(arrString);
          })
          // for (let response in responses) {
          //   console.log(response.data);
          // }
        })
        .catch((err: AxiosError) => {
          toast.error(err.message);
          console.log(err);
        });
    }
    retrieveImageDatas(signature);
  }, [user]);
  console.log(imageDatas);
  imageDatas?.map((data)=>{
    arrString.push(data);
  })
  console.log(arrString);

  //date lokal
  moment.locale("id");
  const dateFormatted = moment(new Date(date)).format("dddd, D MMMM, Y");

  function makePDF() {
    const quotes = document.getElementById("divToPrint");
    toast.loading("Menyimpan...")
    html2canvas(quotes!).then((canvas) => {
      //! MAKE YOUR PDF
      var pdf = new jsPDF({ format: "a4", unit: "px" });
      const pdfWidth = 1500
      const pdfHeight = 2110
      const pdfInnerHeight = 2010
      const pdfInnerWidth = 1400
      const canvasWidth = canvas.width
      const canvasHeight = canvas.height
      const scale = pdfWidth / canvasWidth
      console.log(scale)
      for (var i = 0; i <= canvasHeight / (pdfInnerHeight / scale); i++) {
        //! This is all just html2canvas stuff
        var srcImg = canvas;
        var sX = 0;
        var sY = Math.floor(pdfInnerHeight / scale * i);
        var sWidth = canvasWidth;
        var sHeight = Math.floor(pdfInnerHeight / scale);
        var dX = 50;
        var dY = 50;
        var dWidth = pdfInnerWidth-50;
        var dHeight = pdfInnerHeight;

        var onePageCanvas = document.createElement("canvas");
        onePageCanvas.setAttribute("width", String(pdfWidth));
        onePageCanvas.setAttribute("height", String(pdfHeight));
        var ctx = onePageCanvas.getContext("2d");
        // details on this usage of this function:
        // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
        ctx!.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);
        // ctx?.scale(scale, scale);
        console.log(ctx?.canvas.width, ctx?.canvas.height)
        var canvasDataURL = onePageCanvas.toDataURL("image/png");

        var width = onePageCanvas.width;
        var height = onePageCanvas.clientHeight;
        //! If we're on anything other than the first page,
        // add another page
        if (i > 0) {
          pdf.addPage("a4", "portrait"); //8.5" x 11" in pts (in*72)
        }
        //! now we declare that we're working on that page
        pdf.setPage(i + 1);
        //! now we add content to that page!
        pdf.addImage(canvasDataURL, "JPEG", 7, 0, width * 0.3, height * 0.3);
      }
      //! after the for loop is finished running, we save the pdf.
      toast.dismiss()
      console.log("DONE")
      pdf.save(`report-${outlet.name}-${date}-full.pdf`);
    });
  }

  const visitationTypeOption = ["Layanan Rutin", "Single Job", "Follow Up", "Komplain", "Inspeksi", "Lainnya"];
  let areaIdCounter = 1;
  var allAreaArr = [];
  var singleAreaArr: CsrDetailArea[] = [];
  for (let i = 0; i < detailAreas.length; i++) {
    if (detailAreas[i].area.id == areaIdCounter) {
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
    <div className="mt-4">
      <Container className="w-0 min-w-full">
        <div className="w-0 min-w-full" id="divToPrint">
          <section className="w-0 min-w-full">
            <div className="flex items-start justify-between">
              <Title title={`Laporan ECO-101 / CSR-${id}`} />{" "}
            </div>
            <div className={styles.csrFormHead}>
              <div className="csr-form-head">
                <label htmlFor="date">
                  <img src="/icons/calendar.svg" />
                  <p>Tanggal Layanan</p>
                </label>
                <h2 className="ml-8">{dateFormatted}</h2>
              </div>
              <div className="csr-form-head">
                <label htmlFor="outlet">
                  <img src="/icons/store.svg" className="h-5 w-5" alt="" />
                  <p>Outlet</p>
                </label>
                <h2 className="ml-8">{outlet.name}</h2>
              </div>

              <div className="csr-form-head flex w-full gap-x-4">
                <div className="w-1/2">
                  <label htmlFor="start">
                    <img src="/icons/clock.svg" className="scale-75" />
                    <p>Waktu</p>
                  </label>
                  <h2 className="ml-8">{time}</h2>
                </div>
              </div>

              <div className="csr-form-head w-full">
                <fieldset>
                  <label>Jenis Layanan</label>
                  <div className="ml-8 grid grid-cols-3">
                    <div>
                      <input checked disabled type="radio" id="type-1" value="1" />
                      <label htmlFor="type-1">{visitationTypeOption[visitationType - 1]}</label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
            <div>
              <CsrResultAreaFinding data={allAreaArr} />
            </div>
            <div>
              <CsrResultPestFinding data={detailPests} />
            </div>
            <div>
              <CsrResultPesticideUsage data={pesticideUsages} />
            </div>
            <div>
              <CsrResultSignatures data={signature} technicianName={technician.user.name} picName={picName} />
            </div>

            <div>
              <CsrResultVisitationPhoto data={visitationPhoto} />
            </div>
          </section>
        </div>
      </Container>
      <Container className="mt-4">
        <div className="w-full">
          <Title title="Download Dokumen Full"></Title>
          <Button className="w-full" action={{ name: "Download Full", func: makePDF }}></Button>
        </div>
      </Container>
      <Container className="mt-4">
        <div className="w-full">
          <Title title="Download Dokumen Ringkasan"></Title>
          <PDFDownloadLink document={<PDFFile tanggal={dateFormatted} outlet={outlet.name} jenisTreatment={visitationTypeOption[visitationType - 1]} jam={time} technicianSignature={arrString[0]} picSignature={arrString[1]} technicianName={technician.user.name} picName={picName}/>} fileName={`report-${outlet.name}-${date}-ringkasan.pdf`}>
            {({ blob, url, loading, error }) =>
              loading ? <button className="w-full hover:bg-opacity-70 hover:bg- cursor-pointer rounded-md bg-blue py-2 px-3 text-xs font-semibold text-white md:text-base flex flex-row gap-2 justify-center">Loading document...</button> : <button className="w-full hover:bg-opacity-70 hover:bg- cursor-pointer rounded-md bg-blue py-2 px-3 text-xs font-semibold text-white md:text-base flex flex-row gap-2 justify-center">Download Ringkasan</button>
            }
          </PDFDownloadLink>
        </div>
      </Container>
    </div>
  );
};
