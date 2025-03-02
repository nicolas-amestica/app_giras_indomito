import { HEADER_1 } from "../../assets/img";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(pdfMake as any).vfs = pdfFonts.vfs;

// type Product = {
//   nombre: string;
//   cantidad: number;
//   total: number;
// };

const generatePDF = (travel: any ) => {

  console.log("travel:", travel);

  const { name: destinationName } = travel.destination;

  // const tableBody = [
  //   [
  //     { text: "Nombre producto", style: "tableHeader" },
  //     { text: "Cantidad", style: "tableHeader" },
  //     { text: "Total", style: "tableHeader" },
  //   ],
  //   ...products.map((product) => [
  //     product.nombre,
  //     product.cantidad.toString(),
  //     `$ ${product.total}`,
  //   ]),
  // ];


  // const totalGeneral = products.reduce((sum, product) => sum + product.total, 0);


  const content: any[] = [];

  const HEADER_FIRST_PAGE = [{
    columns: [
      { image: HEADER_1.image, width: 600 },
    ],
  }, {
    text: destinationName.toUpperCase() || '',
    alignment: "left",
    bold: true,
    fontSize: 40,
    color: "#D7FF00",
    absolutePosition: { x: 30, y: 20 }
  }]

  content.push(HEADER_FIRST_PAGE);

  const BODY_FIRST_PAGE = [{
    text: "______________________________",
    alignment: "center",
    margin: [-230, -100, 0, 0],
  },
  {
    text: "______________________________",
    alignment: "center",
    margin: [230, -13, 0, 0],
  },
  {
    text: "______________________________",
    alignment: "center",
    margin: [-230, 100, 0, 0],
  },
  {
    text: "______________________________",
    alignment: "center",
    margin: [230, -13, 0, 0],
  },
  {
    text: "______________________________",
    alignment: "center",
    margin: [-230, 113, 0, 0],
  },
  {
    text: "______________________________",
    alignment: "center",
    margin: [230, -13, 0, 0],
  }, {
    text: "TRANSPORTE",
    alignment: "center",
    margin: [-230, -230, 0, 0],
    bold: true,
    fontSize: 16
  }, {
    text: "Bus exclusivo para el grupo" + "\n" + "2 conductores profesionales",
    alignment: "center",
    margin: [-230, 10, 0, 0],
    bold: false,
    fontSize: 10
  }, {
    text: "COMIDA",
    alignment: "center",
    margin: [230, -52, 0, 0],
    bold: true,
    fontSize: 16
  }, {
    text: "Alimentación completa" + "\n" + "desayuno a bordo",
    alignment: "center",
    margin: [230, 10, 0, 0],
    bold: false,
    fontSize: 10
  }, {
    text: "SEGURIDAD",
    alignment: "center",
    margin: [230, 70, 0, 0],
    bold: true,
    fontSize: 16
  }, {
    text: "Seguro de asistencia" + "\n" + "con Assist Card",
    alignment: "center",
    margin: [230, 10, 0, 0],
    bold: false,
    fontSize: 10
  }, {
    text: "ALOJAMIENTO",
    alignment: "center",
    margin: [-230, -55, 0, 0],
    bold: true,
    fontSize: 16
  }, {
    text: "3 noches de alojamiento" + "\n" + "en hotel de Bariloche",
    alignment: "center",
    margin: [-230, 10, 0, 0],
    bold: false,
    fontSize: 10
  }]

  content.push(BODY_FIRST_PAGE);

  const FOOTER_FIRST_PAGE = [{
    qr: 'https://www.wa.link/yhfi8d',
    fit: 90,
    alignment: "right",
    margin: [100, 130, 0, 10]
  }, {
    text: "Escríbenos al WhatsApp",
    alignment: "center",
    margin: [320, -5, 0, 0],
    link: 'https://www.wa.link/yhfi8d'
  }, {
    text: "haciéndo click aquí",
    alignment: "center",
    margin: [320, 3, 0, 0],
    link: 'https://www.wa.link/yhfi8d'
  }];

  content.push(FOOTER_FIRST_PAGE);



  // content.push({
  //   text: '',
  //   pageBreak: 'after'
  // });

  // content.push({
  //   text: "NUEVA HOJA",
  //   alignment: "center",
  //   margin: [0, 20, 0, 0],
  //   bold: true,
  //   fontSize: 20,
  //   color: 'red'
  // });

  // content.push({ text: "\n" });


  // content.push({
  //   table: {
  //     headerRows: 1,
  //     widths: ["*", "*", "*"],
  //     body: tableBody,
  //   },
  //   layout: "lightHorizontalLines",
  //   margin: [0, 10, 0, 10],
  // });


  // content.push({
  //   columns: [
  //     { text: "", width: "*" },
  //     {
  //       text: `Total: $ ${totalGeneral}`,
  //       style: "total",
  //       alignment: "right",
  //       margin: [0, 10, 0, 10],
  //     },
  //   ],
  // });


  // const styles = {
  //   header: {
  //     fontSize: 14,
  //     bold: true,
  //   },
  //   subheader: {
  //     fontSize: 12,
  //     margin: [0, 5, 0, 5],
  //   },
  //   tableHeader: {
  //     bold: true,
  //     fontSize: 12,
  //     color: "black",
  //   },
  //   total: {
  //     fontSize: 12,
  //     bold: true,
  //   },
  // };


  const docDefinition: any = {
    pageSize: 'A4',
    // watermark: { text: "Giras Indomito", color: "blue", opacity: 0.1, bold: true },
    content,
    // styles,
    pageMargins: [ 0, 0, 0, 0 ],
  };

  pdfMake.createPdf(docDefinition).open();
};

export default generatePDF;
