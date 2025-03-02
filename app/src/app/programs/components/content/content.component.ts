import { ModalController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import { ModalComponent } from "../modal/modal.component";
import { Activity, Destination } from "../../interfaces/travel.interface";
import { DownloadService } from "src/app/shared/services/download.service";
import generatePDF from "src/app/libs/pdf";

@Component({
	selector: "app-about-content",
	templateUrl: "./content.component.html",
	styleUrl: "./content.component.css",
})
export class ContentProgramsComponent implements OnInit {
	travels = [
		{
			zone: "Nacional",
      img: "assets/custom-program-images/nacional.jpg",
			description:
				"Embárcate en una aventura única con nuestras giras de estudio por Chile. Explora los paisajes impresionantes de Pucón y el Sur del país, donde la naturaleza, la " +
        "adrenalina y el aprendizaje se unen. Nuestras experiencias están diseñadas para que los estudiantes vivan, aprendan y se inspiren en los entornos más espectaculares de Chile.",
			destinations: [
				{
					name: "Pucón",
					description: "This is a description 1 description",
					activities: [
						{
							name: "Lago Gutierrez y Mascardi",
							description: "Perfectos para actividades como kayak, trekking y avistamiento de flora y fauna.",
						},
						{
							name: "Circuito Chico",
							description: "Emblemático circuito de Bariloche, donde lagos, montañas y bosques se unen en un paisaje impresionante",
						},
						{
							name: "Bowling",
							description: "Diviértete con una actividad clásica y entretenida en Bariloche. Ideal para relajarse y disfrutar en grupo.",
						},
						{
							name: "Telesilla Cerro Campanario",
							description: "Sube al mirador del Cerro Campanario y disfruta de una de las vistas más espectaculares de Bariloche.",
						},
						{
							name: "Paintball y Cuadrimotos",
							description: "Vive una dosis de adrenalina con el paintball, y recorre los increíbles paisajes de Bariloche en cuatrimotos.",
						},
						{
							name: "Escape Room",
							description: "Resuelve acertijos, supera desafíos y escapa antes de que se agote el tiempo.",
						},
						{
							name: "Asado Argentino",
							description: "Saborea cortes de carne a la parrilla.",
						},
						{
							name: "Canopy",
							description: "Vive la emoción de deslizarte entre los árboles a gran altura con el canopy.",
						},
						{
							name: "Walking Tour",
							description: "Con un guía experto, recorre calles, plazas y puntos históricos, conociendo la cultura, arquitectura y secretos de esta encantadora ciudad patagónica.",
						},
						{
							name: "Fábrica de Chocolates Nonchello",
							description: "Déjate tentar por el aroma del chocolate en la Fábrica Nonchello.",
						},
						{
							name: "Cerro viejo (Tobogán gigante)",
							description: "Disfruta de una caminata o paseo en telesilla hasta la cima del Cerro Viejo.",
						},
						{
							name: "Noche de Disco nro. 1",
							description: "Vive la vibrante noche de Bariloche en una de sus discotecas.",
						},
						{
							name: "Noche de Disco nro. 2",
							description: "Vive la vibrante noche de Bariloche en una de sus discotecas.",
						},
						{
							name: "Noche de Disco nro. 3",
							description: "Vive la vibrante noche de Bariloche en una de sus discotecas.",
						},
						{
							name: 'Termas de "Aguas Calientes"',
							description: "Relájate y rejuvenece en las Termas de Aguas Calientes, rodeadas de naturaleza y aguas termales de origen volcánico.",
						},
						{
							name: "Cena a la Luz de las Velas",
							description: "Vive una experiencia romántica y mágica con una cena a la luz de las velas",
						},
						{
							name: "Foto grupal de viaje",
							description: "Captura un recuerdo único con una foto grupal en los impresionantes paisajes de Bariloche.",
						}
					],
				},
				{
					name: "Sur de Chile",
					description: "This is a description 1 description",
					activities: [
						{
							name: "Lago Gutierrez y Mascardi",
							description: "This is a Activity 1 description",
						},
						{
							name: "Circuito Chico",
							description: "This is a Activity 2 description",
						},
						{
							name: "Bowling",
							description: "This is a Activity 3 description",
						},
						{
							name: "Telesilla Cerro Campanario",
							description: "This is a Activity 4 description",
						},
						{
							name: "Paintball y Cuadrimotos",
							description: "This is a Activity 5 description",
						},
						{
							name: "Escape Room",
							description: "This is a Activity 6 description",
						},
						{
							name: "Asado Argentino",
							description: "This is a Activity 7 description",
						},
						{
							name: "Canopy",
							description: "This is a Activity 8 description",
						},
						{
							name: "Walking Tour",
							description: "This is a Activity 9 description",
						},
						{
							name: "Fábrica de Chocolates Nonchello",
							description: "This is a Activity 10 description",
						},
						{
							name: "Cerro viejo (Tobogán gigante)",
							description: "This is a Activity 6 description",
						},
						{
							name: "Noche de Disco nro. 1",
							description: "This is a Activity 7 description",
						},
						{
							name: "Noche de Disco nro. 2",
							description: "This is a Activity 7 description",
						},
						{
							name: "Noche de Disco nro. 3",
							description: "This is a Activity 7 description",
						},
						{
							name: 'Termas de "Aguas Calientes"',
							description: "This is a Activity 8 description",
						},
						{
							name: "Cena a la Luz de las Velas",
							description: "This is a Activity 9 description",
						},
						{
							name: "Foto grupal de viaje",
							description: "This is a Activity 10 description",
						},
						{
							name: "Rifa pro fondos",
							description: "This is a Activity 10 description",
						},
					],
				},
			],
		},
		{
			zone: "Internacional",
      img: "assets/custom-program-images/internacional.jpg",
			description:
				"Lleva la educación más allá de las fronteras con nuestras giras de estudio internacionales. Descubre la aventura en Bariloche, con sus imponentes montañas y lagos" +
        "y vive la energía de Camboriú, donde la naturaleza y la diversión se encuentran. Estas experiencias únicas combinan aprendizaje, turismo aventura y conexión cultural," +
        "brindando a los estudiantes recuerdos y conocimientos que durarán toda la vida.",
			destinations: [
				{
					name: "Bariloche",
					description: "This is a description 1 description",
					activities: [
						{
							name: "Lago Gutierrez y Mascardi",
							description: "Perfectos para actividades como kayak, trekking y avistamiento de flora y fauna.",
						},
						{
							name: "Circuito Chico",
							description: "Emblemático circuito de Bariloche, donde lagos, montañas y bosques se unen en un paisaje impresionante",
						},
						{
							name: "Bowling",
							description: "Diviértete con una actividad clásica y entretenida en Bariloche. Ideal para relajarse y disfrutar en grupo.",
						},
						{
							name: "Telesilla Cerro Campanario",
							description: "Sube al mirador del Cerro Campanario y disfruta de una de las vistas más espectaculares de Bariloche.",
						},
						{
							name: "Paintball y Cuadrimotos",
							description: "Vive una dosis de adrenalina con el paintball, y recorre los increíbles paisajes de Bariloche en cuatrimotos.",
						},
						{
							name: "Escape Room",
							description: "Resuelve acertijos, supera desafíos y escapa antes de que se agote el tiempo.",
						},
						{
							name: "Asado Argentino",
							description: "Saborea cortes de carne a la parrilla.",
						},
						{
							name: "Canopy",
							description: "Vive la emoción de deslizarte entre los árboles a gran altura con el canopy.",
						},
						{
							name: "Walking Tour",
							description: "Con un guía experto, recorre calles, plazas y puntos históricos, conociendo la cultura, arquitectura y secretos de esta encantadora ciudad patagónica.",
						},
						{
							name: "Fábrica de Chocolates Nonchello",
							description: "Déjate tentar por el aroma del chocolate en la Fábrica Nonchello.",
						},
						{
							name: "Cerro viejo (Tobogán gigante)",
							description: "Disfruta de una caminata o paseo en telesilla hasta la cima del Cerro Viejo.",
						},
						{
							name: "Noche de Disco nro. 1",
							description: "Vive la vibrante noche de Bariloche en una de sus discotecas.",
						},
						{
							name: "Noche de Disco nro. 2",
							description: "Vive la vibrante noche de Bariloche en una de sus discotecas.",
						},
						{
							name: "Noche de Disco nro. 3",
							description: "Vive la vibrante noche de Bariloche en una de sus discotecas.",
						},
						{
							name: 'Termas de "Aguas Calientes"',
							description: "Relájate y rejuvenece en las Termas de Aguas Calientes, rodeadas de naturaleza y aguas termales de origen volcánico.",
						},
						{
							name: "Cena a la Luz de las Velas",
							description: "Vive una experiencia romántica y mágica con una cena a la luz de las velas",
						},
						{
							name: "Foto grupal de viaje",
							description: "Captura un recuerdo único con una foto grupal en los impresionantes paisajes de Bariloche.",
						}
					],
				},
				{
					name: "Camboriú",
					description: "This is a description 1 description",
					activities: [
						{
							name: "Lago Gutierrez y Mascardi",
							description: "This is a Activity 1 description",
						},
						{
							name: "Circuito Chico",
							description: "This is a Activity 2 description",
						},
						{
							name: "Bowling",
							description: "This is a Activity 3 description",
						},
						{
							name: "Telesilla Cerro Campanario",
							description: "This is a Activity 4 description",
						},
						{
							name: "Paintball y Cuadrimotos",
							description: "This is a Activity 5 description",
						},
						{
							name: "Escape Room",
							description: "This is a Activity 6 description",
						},
						{
							name: "Asado Argentino",
							description: "This is a Activity 7 description",
						},
						{
							name: "Canopy",
							description: "This is a Activity 8 description",
						},
						{
							name: "Walking Tour",
							description: "This is a Activity 9 description",
						},
						{
							name: "Fábrica de Chocolates Nonchello",
							description: "This is a Activity 10 description",
						},
						{
							name: "Cerro viejo (Tobogán gigante)",
							description: "This is a Activity 6 description",
						},
						{
							name: "Noche de Disco nro. 1",
							description: "This is a Activity 7 description",
						},
						{
							name: "Noche de Disco nro. 2",
							description: "This is a Activity 7 description",
						},
						{
							name: "Noche de Disco nro. 3",
							description: "This is a Activity 7 description",
						},
						{
							name: 'Termas de "Aguas Calientes"',
							description: "This is a Activity 8 description",
						},
						{
							name: "Cena a la Luz de las Velas",
							description: "This is a Activity 9 description",
						},
						{
							name: "Foto grupal de viaje",
							description: "This is a Activity 10 description",
						},
						{
							name: "Rifa pro fondos",
							description: "This is a Activity 10 description",
						},
					],
				},
			],
		},
		{
			zone: "Mixto",
      img: "assets/custom-program-images/mixto.jpg",
			description: "Vive lo mejor de ambos mundos con nuestras giras de estudio mixtas. Explora los impresionantes paisajes de Pucón y el Sur de Chile, y aventúrate más" +
        "allá de las fronteras hacia Bariloche y Camboriú. Estas experiencias únicas combinan turismo aventura, aprendizaje y diversión, ofreciendo a los estudiantes la" +
        "oportunidad de descubrir la naturaleza, la cultura y la adrenalina en destinos inolvidables.",
			destinations: [
				{
					name: "Bariloche y Sur de Chile",
					description: "This is a description 1 description",
					activities: [
						{
							name: "Lago Gutierrez y Mascardi",
							description: "Perfectos para actividades como kayak, trekking y avistamiento de flora y fauna.",
						},
						{
							name: "Circuito Chico",
							description: "Emblemático circuito de Bariloche, donde lagos, montañas y bosques se unen en un paisaje impresionante",
						},
						{
							name: "Bowling",
							description: "Diviértete con una actividad clásica y entretenida en Bariloche. Ideal para relajarse y disfrutar en grupo.",
						},
						{
							name: "Telesilla Cerro Campanario",
							description: "Sube al mirador del Cerro Campanario y disfruta de una de las vistas más espectaculares de Bariloche.",
						},
						{
							name: "Paintball y Cuadrimotos",
							description: "Vive una dosis de adrenalina con el paintball, y recorre los increíbles paisajes de Bariloche en cuatrimotos.",
						},
						{
							name: "Escape Room",
							description: "Resuelve acertijos, supera desafíos y escapa antes de que se agote el tiempo.",
						},
						{
							name: "Asado Argentino",
							description: "Saborea cortes de carne a la parrilla.",
						},
						{
							name: "Canopy",
							description: "Vive la emoción de deslizarte entre los árboles a gran altura con el canopy.",
						},
						{
							name: "Walking Tour",
							description: "Con un guía experto, recorre calles, plazas y puntos históricos, conociendo la cultura, arquitectura y secretos de esta encantadora ciudad patagónica.",
						},
						{
							name: "Fábrica de Chocolates Nonchello",
							description: "Déjate tentar por el aroma del chocolate en la Fábrica Nonchello.",
						},
						{
							name: "Cerro viejo (Tobogán gigante)",
							description: "Disfruta de una caminata o paseo en telesilla hasta la cima del Cerro Viejo.",
						},
						{
							name: "Noche de Disco nro. 1",
							description: "Vive la vibrante noche de Bariloche en una de sus discotecas.",
						},
						{
							name: "Noche de Disco nro. 2",
							description: "Vive la vibrante noche de Bariloche en una de sus discotecas.",
						},
						{
							name: "Noche de Disco nro. 3",
							description: "Vive la vibrante noche de Bariloche en una de sus discotecas.",
						},
						{
							name: 'Termas de "Aguas Calientes"',
							description: "Relájate y rejuvenece en las Termas de Aguas Calientes, rodeadas de naturaleza y aguas termales de origen volcánico.",
						},
						{
							name: "Cena a la Luz de las Velas",
							description: "Vive una experiencia romántica y mágica con una cena a la luz de las velas",
						},
						{
							name: "Foto grupal de viaje",
							description: "Captura un recuerdo único con una foto grupal en los impresionantes paisajes de Bariloche.",
						}
					],
				},
			],
		},
	];

	customPrograms = [
		{
			nacional: [
				{
          name: "Lago Gutierrez y Mascardi",
          description: "Perfectos para actividades como kayak, trekking y avistamiento de flora y fauna.",
        },
        {
          name: "Circuito Chico",
          description: "Emblemático circuito de Bariloche, donde lagos, montañas y bosques se unen en un paisaje impresionante",
        },
        {
          name: "Bowling",
          description: "Diviértete con una actividad clásica y entretenida en Bariloche. Ideal para relajarse y disfrutar en grupo.",
        },
        {
          name: "Telesilla Cerro Campanario",
          description: "Sube al mirador del Cerro Campanario y disfruta de una de las vistas más espectaculares de Bariloche.",
        },
        {
          name: "Paintball y Cuadrimotos",
          description: "Vive una dosis de adrenalina con el paintball, y recorre los increíbles paisajes de Bariloche en cuatrimotos.",
        },
        {
          name: "Escape Room",
          description: "Resuelve acertijos, supera desafíos y escapa antes de que se agote el tiempo.",
        },
        {
          name: "Asado Argentino",
          description: "Saborea cortes de carne a la parrilla.",
        },
        {
          name: "Canopy",
          description: "Vive la emoción de deslizarte entre los árboles a gran altura con el canopy.",
        },
        {
          name: "Walking Tour",
          description: "Con un guía experto, recorre calles, plazas y puntos históricos, conociendo la cultura, arquitectura y secretos de esta encantadora ciudad patagónica.",
        },
        {
          name: "Fábrica de Chocolates Nonchello",
          description: "Déjate tentar por el aroma del chocolate en la Fábrica Nonchello.",
        },
        {
          name: "Cerro viejo (Tobogán gigante)",
          description: "Disfruta de una caminata o paseo en telesilla hasta la cima del Cerro Viejo.",
        },
        {
          name: "Noche de Disco nro. 1",
          description: "Vive la vibrante noche de Bariloche en una de sus discotecas.",
        },
        {
          name: "Noche de Disco nro. 2",
          description: "Vive la vibrante noche de Bariloche en una de sus discotecas.",
        },
        {
          name: "Noche de Disco nro. 3",
          description: "Vive la vibrante noche de Bariloche en una de sus discotecas.",
        },
        {
          name: 'Termas de "Aguas Calientes"',
          description: "Relájate y rejuvenece en las Termas de Aguas Calientes, rodeadas de naturaleza y aguas termales de origen volcánico.",
        },
        {
          name: "Cena a la Luz de las Velas",
          description: "Vive una experiencia romántica y mágica con una cena a la luz de las velas",
        },
        {
          name: "Foto grupal de viaje",
          description: "Captura un recuerdo único con una foto grupal en los impresionantes paisajes de Bariloche.",
        }
			],
		},
		{
			internacional: [
				{
          name: "Lago Gutierrez y Mascardi",
          description: "Perfectos para actividades como kayak, trekking y avistamiento de flora y fauna.",
        },
        {
          name: "Circuito Chico",
          description: "Emblemático circuito de Bariloche, donde lagos, montañas y bosques se unen en un paisaje impresionante",
        },
        {
          name: "Bowling",
          description: "Diviértete con una actividad clásica y entretenida en Bariloche. Ideal para relajarse y disfrutar en grupo.",
        },
        {
          name: "Telesilla Cerro Campanario",
          description: "Sube al mirador del Cerro Campanario y disfruta de una de las vistas más espectaculares de Bariloche.",
        },
        {
          name: "Paintball y Cuadrimotos",
          description: "Vive una dosis de adrenalina con el paintball, y recorre los increíbles paisajes de Bariloche en cuatrimotos.",
        },
        {
          name: "Escape Room",
          description: "Resuelve acertijos, supera desafíos y escapa antes de que se agote el tiempo.",
        },
        {
          name: "Asado Argentino",
          description: "Saborea cortes de carne a la parrilla.",
        },
        {
          name: "Canopy",
          description: "Vive la emoción de deslizarte entre los árboles a gran altura con el canopy.",
        },
        {
          name: "Walking Tour",
          description: "Con un guía experto, recorre calles, plazas y puntos históricos, conociendo la cultura, arquitectura y secretos de esta encantadora ciudad patagónica.",
        },
        {
          name: "Fábrica de Chocolates Nonchello",
          description: "Déjate tentar por el aroma del chocolate en la Fábrica Nonchello.",
        },
        {
          name: "Cerro viejo (Tobogán gigante)",
          description: "Disfruta de una caminata o paseo en telesilla hasta la cima del Cerro Viejo.",
        },
        {
          name: "Noche de Disco nro. 1",
          description: "Vive la vibrante noche de Bariloche en una de sus discotecas.",
        },
        {
          name: "Noche de Disco nro. 2",
          description: "Vive la vibrante noche de Bariloche en una de sus discotecas.",
        },
        {
          name: "Noche de Disco nro. 3",
          description: "Vive la vibrante noche de Bariloche en una de sus discotecas.",
        },
        {
          name: 'Termas de "Aguas Calientes"',
          description: "Relájate y rejuvenece en las Termas de Aguas Calientes, rodeadas de naturaleza y aguas termales de origen volcánico.",
        },
        {
          name: "Cena a la Luz de las Velas",
          description: "Vive una experiencia romántica y mágica con una cena a la luz de las velas",
        },
        {
          name: "Foto grupal de viaje",
          description: "Captura un recuerdo único con una foto grupal en los impresionantes paisajes de Bariloche.",
        }
			],
		},
		{
			mixto: [
				{
          name: "Lago Gutierrez y Mascardi",
          description: "Perfectos para actividades como kayak, trekking y avistamiento de flora y fauna.",
        },
        {
          name: "Circuito Chico",
          description: "Emblemático circuito de Bariloche, donde lagos, montañas y bosques se unen en un paisaje impresionante",
        },
        {
          name: "Bowling",
          description: "Diviértete con una actividad clásica y entretenida en Bariloche. Ideal para relajarse y disfrutar en grupo.",
        },
        {
          name: "Telesilla Cerro Campanario",
          description: "Sube al mirador del Cerro Campanario y disfruta de una de las vistas más espectaculares de Bariloche.",
        },
        {
          name: "Paintball y Cuadrimotos",
          description: "Vive una dosis de adrenalina con el paintball, y recorre los increíbles paisajes de Bariloche en cuatrimotos.",
        },
        {
          name: "Escape Room",
          description: "Resuelve acertijos, supera desafíos y escapa antes de que se agote el tiempo.",
        },
        {
          name: "Asado Argentino",
          description: "Saborea cortes de carne a la parrilla.",
        },
        {
          name: "Canopy",
          description: "Vive la emoción de deslizarte entre los árboles a gran altura con el canopy.",
        },
        {
          name: "Walking Tour",
          description: "Con un guía experto, recorre calles, plazas y puntos históricos, conociendo la cultura, arquitectura y secretos de esta encantadora ciudad patagónica.",
        },
        {
          name: "Fábrica de Chocolates Nonchello",
          description: "Déjate tentar por el aroma del chocolate en la Fábrica Nonchello.",
        },
        {
          name: "Cerro viejo (Tobogán gigante)",
          description: "Disfruta de una caminata o paseo en telesilla hasta la cima del Cerro Viejo.",
        },
        {
          name: "Noche de Disco nro. 1",
          description: "Vive la vibrante noche de Bariloche en una de sus discotecas.",
        },
        {
          name: "Noche de Disco nro. 2",
          description: "Vive la vibrante noche de Bariloche en una de sus discotecas.",
        },
        {
          name: "Noche de Disco nro. 3",
          description: "Vive la vibrante noche de Bariloche en una de sus discotecas.",
        },
        {
          name: 'Termas de "Aguas Calientes"',
          description: "Relájate y rejuvenece en las Termas de Aguas Calientes, rodeadas de naturaleza y aguas termales de origen volcánico.",
        },
        {
          name: "Cena a la Luz de las Velas",
          description: "Vive una experiencia romántica y mágica con una cena a la luz de las velas",
        },
        {
          name: "Foto grupal de viaje",
          description: "Captura un recuerdo único con una foto grupal en los impresionantes paisajes de Bariloche.",
        }
			],
		},
	];

	staticActivities = [
		{
			name: "Desayuno a bordo",
			description: "This is a Activity 1 description",
		},{
      name: "Rifa pro fondos",
      description: "This is a Activity 1 description",
    }
	];

	defaultPrograms = [
		{
			name: "Sur de Chile ECO",
			description: "This is a program 1 description",
			link: "assets/1.pdf",
		},
		{
			name: "Sur de Chile Light",
			description: "This is a program 2 description",
			link: "assets/2.pdf",
		},
		{
			name: "Sur de Chile Full",
			description: "This is a program 3 description",
			link: "assets/3.pdf",
		},
		{
			name: "Bariloche ECO",
			description: "This is a program 4 description",
			link: "assets/4.pdf",
		},
		{
			name: "Bariloche Light",
			description: "This is a program 5 description",
			link: "assets/5.pdf",
		},
		{
			name: "Bariloche Full",
			description: "This is a program 6 description",
			link: "assets/6.pdf",
		},
		{
			name: "Bariloche y Sur de Chile",
			description: "This is a program 7 description",
			link: "assets/7.pdf",
		},
	];

	activitiesSelected: Activity[] = [];
  destinationSelected: Destination[] = [];
  zoneSelected = "";

	constructor(
		private downloadService: DownloadService,
		private modalCtrl: ModalController,
	) {}

	ngOnInit(): void { }

	downloadDefaultProgram(defaultProgram: {
		name: string;
		description: string;
		link: string;
	}) {
		this.downloadService
			.downloadPdf(defaultProgram.link)
			.subscribe((blob: Blob) => {
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = url;
				a.download = defaultProgram.name;
				a.click();
				window.URL.revokeObjectURL(url);
			});
	}

	downloadCustomProgram() {
		// const products = [
		// 	{ nombre: "Parlante", cantidad: 1, total: 1000 },
		// 	{ nombre: "Laptop", cantidad: 2, total: 2000 },
		// 	{ nombre: "Televisor", cantidad: 3, total: 3000 },
		// 	{ nombre: "Radio", cantidad: 4, total: 4000 },
		// 	{ nombre: "Chromecast", cantidad: 5, total: 5000 },
		// ];

		// const reciboNo = "123456789";
		// const fecha = new Date().toLocaleDateString();

		generatePDF({ activities: this.activitiesSelected, destination: this.destinationSelected, zone: this.zoneSelected });
		// generatePDF(products, reciboNo, fecha);
	}


	async openModalDestination(destinations: Destination[], zone: string) {
		const modal = await this.modalCtrl.create({
			component: ModalComponent,
			componentProps: {
				destinations,
				zone,
			},
			presentingElement: await this.modalCtrl.getTop(),
			mode: "ios",
		});

		await modal.present();

		const { data } = await modal.onWillDismiss();

		if (data) {
			this.activitiesSelected = data.activities;
      this.destinationSelected = data.destination;
      this.zoneSelected = data.zone;
		}
	}

  removeActivity(activity: Activity) {
    this.activitiesSelected = this.activitiesSelected.filter((act) => act.name !== activity.name);
    console.log(this.activitiesSelected);

  }
}
