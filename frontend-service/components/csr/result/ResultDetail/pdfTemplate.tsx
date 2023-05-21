import React, { FC } from "react";
import { Page, Text, Image, Document, StyleSheet, View } from "@react-pdf/renderer";
import {Font} from '@react-pdf/renderer';

const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 45,
      paddingHorizontal: 35,
    },
    title: {
      marginBottom: 12,
      fontSize: 24,
      textAlign: 'center',
      fontFamily: 'Times-Roman'
    },
    data: {
      margin: 2,
      fontSize: 12,
      textAlign: 'justify',
      fontFamily: 'Times-Roman'
    },
    text: {
        marginTop: 12,
        marginBottom: 24,
        fontSize: 12,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
    },
    smol: {
        fontSize: 10,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 12,
        textAlign: 'center',
        justifyContent: 'space-around',
        fontFamily: 'Times-Roman'
    },
    container2: {
        fontSize: 12,
        textAlign: 'justify',
        fontFamily: 'Times-Roman',
        alignItems: 'center'
    },
    image: {
        maxHeight: '144px',
        maxWidth: '144px',
    },
    bigContainer: {
        paddingTop: 24,
    }
  });

const PDFFile: FC<{
    tanggal: String,
    outlet: String,
    jenisTreatment: String,
    jam: String,
    technicianSignature: String,
    picSignature: String,
    technicianName: String,
    picName: String
}> = (
{
    jam,
    jenisTreatment,
    outlet,
    tanggal,
    technicianSignature,
    picSignature,
    technicianName,
    picName
}
) => {
  
  return (
    <Document>
      <Page style={styles.body} size="A5" orientation="landscape">
        <Text style={styles.title}>Bukti Pelaksanaan Treatment Ecolab</Text>
        <Text style={styles.data} >Tanggal Treatment   : {tanggal}</Text>
        <Text style={styles.data}>Outlet                       : {outlet}</Text>
        <Text style={styles.data}>Jenis Treatment        : {jenisTreatment}</Text>
        <Text style={styles.data}>Jam                           : {jam}</Text>
        <br></br>
        <Text style={styles.text}>General pest treatment yang melibatkan pemeriksaan menyeluruh pada area untuk
mengidentifikasi hama dan melakukan tindakan terhadap hama temuan</Text>
        <Text style={styles.smol}>*Detail mengenai hasil treatment dapat diakses melalui laporan lengkap treatment</Text>
        <View style={styles.bigContainer}>
            <View style={styles.container}>
                <View style={styles.container2}>
                    <Image
                        style={styles.image}
                        src={`data:image/jpeg;base64, ${technicianSignature}`}/>
                    <Text>{technicianName}</Text>
                </View>
                <View style={styles.container2}>
                    <Image
                        style={styles.image}
                        src={`data:image/jpeg;base64, ${picSignature}`}/>
                    <Text>{picName}</Text>
                </View>
            </View>
        </View>
        
      </Page>
    </Document>
  );
};

export default PDFFile;