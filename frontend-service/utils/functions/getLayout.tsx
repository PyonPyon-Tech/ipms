import { Layout } from "@components/layout";
import Head from "next/head";
import { ReactElement } from "react";

export function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Open House Fasilkom UI 2021 adalah acara rutin tahunan yang merupakan salah satu program kerja Biro Hubungan Masyarakat Badan Eksekutif Mahasiswa (BEM) Fasilkom UI yang menargetkan siswa/i Sekolah Menengah Atas di kawasan Jabodetabek maupun Non-Jabodetabek sebagai pesertanya dengan harapan para peserta dapat mengenal dan mengetahui Fasilkom UI lebih dalam sehingga dapat mempersiapkan diri dalam menyusun rencana masa depannya."
        />
        <link rel="shortcut icon" href="/ecolab.ico" />
      </Head>
      {page}
    </Layout>
  );
}
