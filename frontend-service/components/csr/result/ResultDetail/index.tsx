import { Container } from "@components/general/Container";
import { CsrReport } from "@models/report/CsrReport";
import { FC } from "react";
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
  const signature = [technicianSignature, picSignature];


  //date lokal
  moment.locale("id");
  const dateFormatted = moment(new Date(date)).format("dddd, D MMMM, Y");

  //function to make the page as a image and convert it to PDF
  const printDocument = () => {
    const pdf = new jsPDF({ format: "a4", unit: "px" });

    const input = document.getElementById("divToPrint");
    html2canvas(input!).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "JPEG", 7, 0, 430, 2800);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
  };

    function makePDF() {

      const quotes = document.getElementById("divToPrint");
      html2canvas(quotes!).then((canvas) => {
           //! MAKE YOUR PDF
           var pdf = new jsPDF({ format: "a4", unit: "px" });

           for (var i = 0; i <= quotes!.clientHeight/2110; i++) {
               //! This is all just html2canvas stuff
               var srcImg  = canvas;
               var sX      = 0;
               var sY      = 2110*i; // start 2110 pixels down for every new page
               var sWidth  = 1500;
               var sHeight = 2110;
               var dX      = 0;
               var dY      = 0;
               var dWidth  = 1500;
               var dHeight = 2110;

               var onePageCanvas = document.createElement("canvas");
               onePageCanvas.setAttribute('width', "1500");
               onePageCanvas.setAttribute('height', "2110");
               var ctx = onePageCanvas.getContext('2d');
               // details on this usage of this function:
               // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
               ctx!.drawImage(srcImg,sX,sY,sWidth,sHeight,dX,dY,dWidth,dHeight);

               // document.body.appendChild(canvas);
               var canvasDataURL = onePageCanvas.toDataURL("image/png");

               var width         = onePageCanvas.width;
               var height        = onePageCanvas.clientHeight;

               //! If we're on anything other than the first page,
               // add another page
               if (i > 0) {
                   pdf.addPage('a4', 'portrait'); //8.5" x 11" in pts (in*72)
               }
               //! now we declare that we're working on that page
               pdf.setPage(i+1);
               //! now we add content to that page!
               pdf.addImage(canvasDataURL, 'PNG', 7, 0, (width*.3), (height*.3));

           }
           //! after the for loop is finished running, we save the pdf.
           pdf.save('Test.pdf');
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
                    <p>Waktu Mulai</p>
                  </label>
                  <h2 className="ml-8">{start}</h2>
                </div>
                <div className="w-1/2">
                  <label htmlFor="end">
                    <img src="/icons/clock.svg" />
                    <p>Waktu Selesai</p>
                  </label>
                  <h2 className="ml-8">{end}</h2>
                </div>
              </div>

              <div className="csr-form-head w-full">
                <fieldset>
                  <label>Jenis Layanan</label>
                  <div className="ml-8 grid grid-cols-3">
                    <div>
                      <input
                        checked
                        disabled
                        type="radio"
                        id="type-1"
                        value="1"
                      />
                      <label htmlFor="type-1">
                        {visitationTypeOption[visitationType - 1]}
                      </label>
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
            <CsrResultSignatures data={signature} />
            </div>
            <div>
              <CsrResultVisitationPhoto data={visitationPhoto}/>
            </div>
          </section>
        </div>
      </Container>
      <Container className="mt-4">
        <div className="w-full">
          <Title title="Download Dokumen"></Title>
          <Button
            className="w-full"
            action={{ name: "Download", func: makePDF }}
          ></Button>
        </div>
      </Container>
    </div>
  );
};
