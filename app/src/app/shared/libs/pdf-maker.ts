import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";

import { HEADER, LOGOS, PDF_IMAGES, FOOTER } from "../../../assets/img";

(pdfMake as any).vfs = pdfFonts.vfs;

const generatePDF = (travel: any) => {
	// travel = {
	// 	activities: [
	// 		{
	// 			name: "Lago Gutierrez y Mascardi",
	// 			description:
	// 				"Perfectos para actividades como kayak, trekking y avistamiento de flora y fauna.",
	// 		},
	// 		{
	// 			name: "Circuito Chico",
	// 			description:
	// 				"Emblemático circuito de Bariloche, donde lagos, montañas y bosques se unen en un paisaje impresionante",
	// 		},
	// 		{
	// 			name: "Bowling",
	// 			description:
	// 				"Diviértete con una actividad clásica y entretenida en Bariloche. Ideal para relajarse y disfrutar en grupo.",
	// 		},
	// 		{
	// 			name: "Telesilla Cerro Campanario",
	// 			description:
	// 				"Sube al mirador del Cerro Campanario y disfruta de una de las vistas más espectaculares de Bariloche.",
	// 		},
	// 	],
	// 	destination: {
	// 		name: "Bariloche",
	// 		description: "This is a description 1 description",
	// 		activities: [
	// 			{
	// 				name: "Lago Gutierrez y Mascardi",
	// 				description:
	// 					"Perfectos para actividades como kayak, trekking y avistamiento de flora y fauna.",
	// 			},
	// 			{
	// 				name: "Circuito Chico",
	// 				description:
	// 					"Emblemático circuito de Bariloche, donde lagos, montañas y bosques se unen en un paisaje impresionante",
	// 			},
	// 			{
	// 				name: "Bowling",
	// 				description:
	// 					"Diviértete con una actividad clásica y entretenida en Bariloche. Ideal para relajarse y disfrutar en grupo.",
	// 			},
	// 			{
	// 				name: "Telesilla Cerro Campanario",
	// 				description:
	// 					"Sube al mirador del Cerro Campanario y disfruta de una de las vistas más espectaculares de Bariloche.",
	// 			},
	// 			{
	// 				name: "Paintball y Cuadrimotos",
	// 				description:
	// 					"Vive una dosis de adrenalina con el paintball, y recorre los increíbles paisajes de Bariloche en cuatrimotos.",
	// 			},
	// 			{
	// 				name: "Escape Room",
	// 				description:
	// 					"Resuelve acertijos, supera desafíos y escapa antes de que se agote el tiempo.",
	// 			},
	// 			{
	// 				name: "Asado Argentino",
	// 				description: "Saborea cortes de carne a la parrilla.",
	// 			},
	// 			{
	// 				name: "Canopy",
	// 				description:
	// 					"Vive la emoción de deslizarte entre los árboles a gran altura con el canopy.",
	// 			},
	// 			{
	// 				name: "Walking Tour",
	// 				description:
	// 					"Con un guía experto, recorre calles, plazas y puntos históricos, conociendo la cultura, arquitectura y secretos de esta encantadora ciudad patagónica.",
	// 			},
	// 			{
	// 				name: "Fábrica de Chocolates Nonchello",
	// 				description:
	// 					"Déjate tentar por el aroma del chocolate en la Fábrica Nonchello.",
	// 			},
	// 			{
	// 				name: "Cerro viejo (Tobogán gigante)",
	// 				description:
	// 					"Disfruta de una caminata o paseo en telesilla hasta la cima del Cerro Viejo.",
	// 			},
	// 			{
	// 				name: "Noche de Disco nro. 1",
	// 				description:
	// 					"Vive la vibrante noche de Bariloche en una de sus discotecas.",
	// 			},
	// 			{
	// 				name: "Noche de Disco nro. 2",
	// 				description:
	// 					"Vive la vibrante noche de Bariloche en una de sus discotecas.",
	// 			},
	// 			{
	// 				name: "Noche de Disco nro. 3",
	// 				description:
	// 					"Vive la vibrante noche de Bariloche en una de sus discotecas.",
	// 			},
	// 			{
	// 				name: 'Termas de "Aguas Calientes"',
	// 				description:
	// 					"Relájate y rejuvenece en las Termas de Aguas Calientes, rodeadas de naturaleza y aguas termales de origen volcánico.",
	// 			},
	// 			{
	// 				name: "Cena a la Luz de las Velas",
	// 				description:
	// 					"Vive una experiencia romántica y mágica con una cena a la luz de las velas",
	// 			},
	// 			{
	// 				name: "Foto grupal de viaje",
	// 				description:
	// 					"Captura un recuerdo único con una foto grupal en los impresionantes paisajes de Bariloche.",
	// 			},
	// 		],
	// 	},
	// 	zone: "Internacional",
	// };

	const { name: destinationName } = travel.destination;
	const content: any[] = [];

	// Listar actividades
	const activities = travel.activities
		.map((activity: any, index: number) => {
			return index % 2 === 1 ? `${activity.name}\n` : activity.name;
		})
		.join(", ");

	// Cabecera
	const HEADER_FIRST_PAGE = [
		{
			columns: [
				{
					image: HEADER.image,
					width: 615,
					alignment: "center",
					margin: [0, 0, 0, 0],
					absolutePosition: { x: 0, y: 0 },
				},
			],
		},
		{
			text: destinationName.toUpperCase() || "",
			alignment: "left",
			bold: true,
			fontSize: 40,
			color: "#CDD601",
			absolutePosition: { x: 30, y: 20 },
		},
	];

	content.push(HEADER_FIRST_PAGE);

	const BODY_FIRST_PAGE_1 = [
		{
			columns: [
				{
					// Timbre
					image: PDF_IMAGES.bell,
					width: 100,
					alignment: "center",
					absolutePosition: { x: -450, y: 650 },
				},
				{
					// Barra achurada central
					image: PDF_IMAGES.secondaryBar,
					width: 5,
					height: 350,
					alignment: "center",
					absolutePosition: { x: 0, y: 270 },
				},
			],
		},
	];

	content.push(BODY_FIRST_PAGE_1);

	// Barras principales negras
	const BODY_FIRST_PAGE_BAR = [
		{
			columns: [
				{
					// Barra Transporte
					image: PDF_IMAGES.principalBar,
					width: 210,
					alignment: "center",
					absolutePosition: { x: -330, y: 265 },
				},
				{
					// Barra alojamiento
					image: PDF_IMAGES.principalBar,
					width: 210,
					alignment: "center",
					absolutePosition: { x: -330, y: 400 },
				},
				{
					// Barra beneficios exclusivos
					image: PDF_IMAGES.principalBar,
					width: 210,
					alignment: "center",
					absolutePosition: { x: -330, y: 525 },
				},
				{
					// Barra servicios adicionales
					image: PDF_IMAGES.principalBar,
					width: 210,
					alignment: "center",
					absolutePosition: { x: 320, y: 525 },
				},
				{
					// Barra seguridad
					image: PDF_IMAGES.principalBar,
					width: 210,
					alignment: "center",
					absolutePosition: { x: 320, y: 400 },
				},
				{
					// Barra alimentación
					image: PDF_IMAGES.principalBar,
					width: 210,
					alignment: "center",
					absolutePosition: { x: 320, y: 265 },
				},
				{
					// Barra Actividades
					image: PDF_IMAGES.principalBar,
					width: 210,
					alignment: "center",
					absolutePosition: { x: 0, y: 650 },
				},
			],
		},
	];

	content.push(BODY_FIRST_PAGE_BAR);

	// Títulos principales
	const BODY_FIRST_PAGE_TITLES = [
		{
			columns: [
				{
					// Título Transporte
					text: "Transporte".toUpperCase(),
					alignment: "center",
					bold: true,
					fontSize: 12,
					color: "#ffffff",
					absolutePosition: { x: -335, y: 272 },
				},
				{
					// Título alimentación
					text: "Alimentación".toUpperCase(),
					alignment: "center",
					bold: true,
					fontSize: 12,
					color: "#ffffff",
					absolutePosition: { x: 315, y: 272 },
				},
				{
					// Título seguridad
					text: "seguridad".toUpperCase(),
					alignment: "center",
					bold: true,
					fontSize: 12,
					color: "#ffffff",
					absolutePosition: { x: 315, y: 407 },
				},
				{
					// Título servicios adicionales
					text: "servicios adicionales".toUpperCase(),
					alignment: "center",
					bold: true,
					fontSize: 12,
					color: "#ffffff",
					absolutePosition: { x: 315, y: 532 },
				},
				{
					// Título alojamiento
					text: "alojamiento".toUpperCase(),
					alignment: "center",
					bold: true,
					fontSize: 12,
					color: "#ffffff",
					absolutePosition: { x: -335, y: 407 },
				},
				{
					// Título beneficios exclusivos
					text: "beneficios exclusivos".toUpperCase(),
					alignment: "center",
					bold: true,
					fontSize: 12,
					color: "#ffffff",
					absolutePosition: { x: -335, y: 532 },
				},
				{
					// Título Actividades
					text: "Actividades".toUpperCase(),
					alignment: "center",
					bold: true,
					fontSize: 12,
					color: "#ffffff",
					absolutePosition: { x: 0, y: 658 },
				},
			],
		},
	];

	content.push(BODY_FIRST_PAGE_TITLES);

	// Leyenda transporte
	const BODY_FIRST_PAGE_ARROWS_TRANSPORT = [
		{
			columns: [
				{
					// Flecha transporte 1
					image: PDF_IMAGES.arrow,
					width: 8,
					alignment: "center",
					absolutePosition: { x: -480, y: 300 },
				},
				{
					// Flecha transporte 2
					image: PDF_IMAGES.arrow,
					width: 8,
					alignment: "center",
					absolutePosition: { x: -480, y: 320 },
				},
				{
					// Flecha transporte 3
					image: PDF_IMAGES.arrow,
					width: 8,
					alignment: "center",
					absolutePosition: { x: -480, y: 340 },
				},
				{
					// Flecha transporte 4
					image: PDF_IMAGES.arrow,
					width: 8,
					alignment: "center",
					absolutePosition: { x: -480, y: 360 },
				},
				{
					// Flecha transporte 5
					image: PDF_IMAGES.arrow,
					width: 8,
					alignment: "center",
					absolutePosition: { x: -480, y: 380 },
				},
				{
					// Leyenda Transporte 1
					text: "Bus exclusivo para el grupo.",
					alignment: "center",
					bold: false,
					fontSize: 9,
					color: "#000000",
					absolutePosition: { x: -350, y: 300 },
				},
				{
					// Leyenda Transporte 2
					text: "Conductores profesionales.",
					alignment: "center",
					bold: false,
					fontSize: 9,
					color: "#000000",
					absolutePosition: { x: -350, y: 320 },
				},
				{
					// Leyenda Transporte 3
					text: "Ida y vuelta desde tu ciudad.",
					alignment: "center",
					bold: false,
					fontSize: 9,
					color: "#000000",
					absolutePosition: { x: -350, y: 340 },
				},
				{
					// Leyenda Transporte 4
					text: "Cargador USB en cada asiento.",
					alignment: "center",
					bold: false,
					fontSize: 9,
					color: "#000000",
					absolutePosition: { x: -338, y: 360 },
				},
				{
					// Leyenda Transporte 5
					text: "Baño y cinturones de seguridad.",
					alignment: "center",
					bold: false,
					fontSize: 9,
					color: "#000000",
					absolutePosition: { x: -335, y: 380 },
				},
			],
		},
	];

	content.push(BODY_FIRST_PAGE_ARROWS_TRANSPORT);

	// Leyenda alojamiento
	const BODY_FIRST_PAGE_ARROWS_HOUSING = [
		{
			columns: [
				{
					// Flecha alojamiento 1
					image: PDF_IMAGES.arrow,
					width: 8,
					alignment: "center",
					absolutePosition: { x: -480, y: 440 },
				},
				{
					// Flecha alojamiento 2
					image: PDF_IMAGES.arrow,
					width: 8,
					alignment: "center",
					absolutePosition: { x: -480, y: 460 },
				},
				{
					// Flecha alojamiento 3
					image: PDF_IMAGES.arrow,
					width: 8,
					alignment: "center",
					absolutePosition: { x: -480, y: 490 },
				},
				{
					// Leyenda alojamiento 1
					text: "Lugar céntrico/turístico.",
					alignment: "center",
					bold: false,
					fontSize: 9,
					color: "#000000",
					absolutePosition: { x: -368, y: 440 },
				},
				{
					// Leyenda alojamiento 2
					text: "Alojamiento en hoteles o cabañas\n según lugar.",
					alignment: "left",
					bold: false,
					fontSize: 9,
					color: "#000000",
					absolutePosition: { x: 75, y: 460 },
				},
				{
					// Leyenda alojamiento 3
					text: "Cuenta con WIFI y seguridad.",
					alignment: "center",
					bold: false,
					fontSize: 9,
					color: "#000000",
					absolutePosition: { x: -350, y: 491 },
				},
			],
		},
	];

	content.push(BODY_FIRST_PAGE_ARROWS_HOUSING);

	// Leyenda beneficios exclusivos
	const BODY_FIRST_PAGE_ARROWS_EXCLUSIVE_BENEFITS = [
		{
			columns: [
				{
					// Flecha alojamientobeneficios exclusivos 1
					image: PDF_IMAGES.arrow,
					width: 8,
					alignment: "center",
					absolutePosition: { x: -480, y: 565 },
				},
				{
					// Flecha beneficios exclusivos 2
					image: PDF_IMAGES.arrow,
					width: 8,
					alignment: "center",
					absolutePosition: { x: -480, y: 585 },
				},
				{
					// Flecha beneficios exclusivos 3
					image: PDF_IMAGES.arrow,
					width: 8,
					alignment: "center",
					absolutePosition: { x: -480, y: 615 },
				},
				{
					// Leyenda beneficios exclusivos 1
					text: "Mochila Giras Indómito de regalo.",
					alignment: "center",
					bold: false,
					fontSize: 9,
					color: "#000000",
					absolutePosition: { x: -330, y: 565 },
				},
				{
					// Leyenda beneficios exclusivos 2
					text: "Rifas pro-fondos a beneficio de los\nestudiantes con increíbles premios.",
					alignment: "left",
					bold: false,
					fontSize: 9,
					color: "#000000",
					absolutePosition: { x: 75, y: 585 },
				},
				{
					// Leyenda beneficios exclusivos 3
					text: "Si tienes un hermano que también viajó\ncon nosotros, ¡tienes un 20% de descuento!.",
					alignment: "left",
					bold: false,
					fontSize: 9,
					color: "#000000",
					absolutePosition: { x: 75, y: 615 },
				},
			],
		},
	];

	content.push(BODY_FIRST_PAGE_ARROWS_EXCLUSIVE_BENEFITS);

	// Leyenda alimentación
	const BODY_FIRST_PAGE_FEEDING = [
		{
			columns: [
				{
					// Flecha alimentación 1
					image: PDF_IMAGES.arrow,
					width: 8,
					alignment: "center",
					absolutePosition: { x: 200, y: 310 },
				},
				{
					// Flecha alimentación 2
					image: PDF_IMAGES.arrow,
					width: 8,
					alignment: "center",
					absolutePosition: { x: 200, y: 330 },
				},
				{
					// Leyenda alimentación 1
					text: "Desayuno a bordo.",
					alignment: "center",
					bold: false,
					fontSize: 9,
					color: "#000000",
					absolutePosition: { x: 290, y: 310 },
				},
				{
					// Leyenda alimentación 2
					text: "Buffet en hotel o comidas en \nrestaurant con alimentación completa\n(algunos destinos incluyen bajón\nnocturno).",
					alignment: "left",
					bold: false,
					fontSize: 9,
					color: "#000000",
					absolutePosition: { x: 413, y: 330 },
				},
			],
		},
	];

	content.push(BODY_FIRST_PAGE_FEEDING);

	// Leyenda seguridad
	const BODY_FIRST_PAGE_SECURITY = [
		{
			columns: [
				{
					// Flecha seguridad 1
					image: PDF_IMAGES.arrow,
					width: 8,
					alignment: "center",
					absolutePosition: { x: 200, y: 445 },
				},
				{
					// Flecha seguridad 2
					image: PDF_IMAGES.arrow,
					width: 8,
					alignment: "center",
					absolutePosition: { x: 200, y: 470 },
				},
				{
					// Flecha seguridad 3
					image: PDF_IMAGES.arrow,
					width: 8,
					alignment: "center",
					absolutePosition: { x: 200, y: 495 },
				},
				{
					// Leyenda seguridad 1
					text: "Cobertura nacional\n e internacional.",
					alignment: "left",
					bold: false,
					fontSize: 9,
					color: "#000000",
					absolutePosition: { x: 413, y: 445 },
				},
				{
					// Leyenda seguridad 2
					text: "Seguro de asistencia\ncon Assist Card 24/7.",
					alignment: "left",
					bold: false,
					fontSize: 9,
					color: "#000000",
					absolutePosition: { x: 413, y: 470 },
				},
				{
					// Leyenda seguridad 3
					text: "Cubre hasta $35.000 US.",
					alignment: "center",
					bold: false,
					fontSize: 9,
					color: "#000000",
					absolutePosition: { x: 313, y: 497 },
				},
			],
		},
	];

	content.push(BODY_FIRST_PAGE_SECURITY);

	// Leyenda servicios adicionales
	const BODY_FIRST_PAGE_ADITIONAL_SERVICES = [
		{
			columns: [
				{
					// Flecha servicios adicionales 1
					image: PDF_IMAGES.arrow,
					width: 8,
					alignment: "center",
					absolutePosition: { x: 200, y: 570 },
				},
				{
					// Leyenda servicios adicionales 1
					text: "Algunos planes tienen: Cuatrimotos,\n Paintball y noches de Discos.",
					alignment: "left",
					bold: false,
					fontSize: 9,
					color: "#000000",
					absolutePosition: { x: 412, y: 570 },
				},
			],
		},
	];

	content.push(BODY_FIRST_PAGE_ADITIONAL_SERVICES);

	// Leyenda Actividades
	const BODY_FIRST_PAGE_Actividades = [
		{
			columns: [
				{
					// Flecha Actividades 1
					image: PDF_IMAGES.arrow,
					width: 8,
					alignment: "center",
					absolutePosition: { x: -180, y: 690 },
				},
				{
					// Leyenda Actividades 1
					text: `${activities}`,
					alignment: "left",
					bold: true,
					fontSize: 9,
					color: "#000000",
					absolutePosition: { x: 225, y: 690 },
				},
			],
		},
	];

	content.push(BODY_FIRST_PAGE_Actividades);

	// Logos
	const BODY_FIRST_PAGE_DRAWING = [
		{
			columns: [
				{
					// Logo transporte
					image: LOGOS.transport,
					width: 18,
					alignment: "center",
					absolutePosition: { x: -170, y: 270 },
				},
				{
					// Logo alojamiento
					image: LOGOS.housing,
					width: 18,
					alignment: "center",
					absolutePosition: { x: -170, y: 405 },
				},
				{
					// Logo beneficios exclusivos
					image: LOGOS.exclusiveBenefits,
					width: 18,
					alignment: "center",
					absolutePosition: { x: -170, y: 530 },
				},
				{
					// Logo alimentación
					image: LOGOS.food,
					width: 18,
					alignment: "center",
					absolutePosition: { x: 480, y: 270 },
				},
				{
					// Logo seguridad
					image: LOGOS.security,
					width: 18,
					alignment: "center",
					absolutePosition: { x: 480, y: 407 },
				},
				{
					// Logo servicios adicionales
					image: LOGOS.transport,
					width: 18,
					alignment: "center",
					absolutePosition: { x: 480, y: 530 },
				},
				{
					// Logo Actividades
					image: LOGOS.transport,
					width: 18,
					alignment: "center",
					absolutePosition: { x: 160, y: 655 },
				},
				{
					// Logo discos/party
					image: LOGOS.party,
					width: 150,
					alignment: "center",
					absolutePosition: { x: 350, y: 600 },
				},
				{
					// Logo cuatrimoto y paintball
					image: LOGOS.activities,
					width: 16,
					alignment: "center",
					absolutePosition: { x: 530, y: 570 },
				},
			],
		},
	];

	content.push(BODY_FIRST_PAGE_DRAWING);

	// QR
	const QR = [
		{
			columns: [
				{
					qr: "https://www.girasindomito.cl/",
					fit: 50,
					alignment: "center",
					absolutePosition: { x: 250, y: 700 },
				},
				{
					// Leyenda QR 1
					text: "¿Quiéres otras alternativas?\nEscanéa el siguiente código y\narma tu propio plan.",
					alignment: "left",
					bold: false,
					fontSize: 9,
					lineHeight: 1,
					color: "#000000",
					absolutePosition: { x: 460, y: 710 },
				},
			],
		},
	];

	content.push(QR);

	// Pié de página
	const HEADER_FIRST_PAGE_FOOTER = [
		{
			columns: [
				{
					image: FOOTER.image,
					width: 500,
					alignment: "center",
					absolutePosition: { x: 0, y: 760 },
				},
			],
		},
	];

	content.push(HEADER_FIRST_PAGE_FOOTER);

	// Leyenda final
	const FINAL_LEYEND = [
		{
			columns: [
				{
					// Leyenda final 1
					text: "Presenta esta propuesta a nuestro equipo,\npara ayudarte con los planes.",
					alignment: "center",
					bold: true,
					fontSize: 8,
					lineHeight: 1,
					color: "#ff0000",
					absolutePosition: { x: -150, y: 730 },
				},
			],
		},
	];

	content.push(FINAL_LEYEND);

	const docDefinition: any = {
		pageSize: "LETTER",
		// watermark: {
		// 	text: "Giras Indomito",
		// 	color: "blue",
		// 	opacity: 0.1,
		// 	bold: false,
		// },
		content,
		// styles,
		pageMargins: [0, 0, 0, 0],
	};

	pdfMake.createPdf(docDefinition).open();
};

export default generatePDF;
