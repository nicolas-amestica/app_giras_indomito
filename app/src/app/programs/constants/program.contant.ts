export const DESTINATIONS = [{
    name: "Nacional",
    destinations: [{
        name: "Pucón",
        files: [{
            name: "Pucón ECO (Terrestre)",
            link: "puconeco.pdf"
          }, {
            name: "Pucón LIGHT (Terrestre)",
            link: "puconlight.pdf"
          }, {
            name: "Pucón FULL (Terrestre)",
            link: "puconfull.pdf"
          }, {
            name: "Pucón PRO (Terrestre)",
            link: "puconpro.pdf"
          }, {
            name: "Pucón ECO (Aereo)",
            link: "puconeco.pdf"
          }, {
            name: "Pucón LIGHT (Aereo)",
            link: "puconlight.pdf"
          }, {
            name: "Pucón FULL (Aereo)",
            link: "puconfull.pdf"
          }, {
            name: "Pucón PRO (Aereo)",
            link: "puconpro.pdf"
          }]
      }, {
        name: "Sur de Chile",
        files: [
          {
            name: "Sur de Chile ECO",
            link: "surdechileeco.pdf"
          }, {
            name: "Sur de Chile LIGHT",
            link: "surdechilelight.pdf"
          }, {
            name: "Sur de Chile FULL",
            link: "surdechilefull.pdf"
          }
        ]
      }
  ]}, {
    name: "Internacional",
    destinations: [{
        name: "Bariloche",
        files: [
          {
            name: "Bariloche ECO",
            link: "barilocheeco.pdf"
          }, {
            name: "Bariloche LIGHT",
            link: "barilochelight.pdf"
          }, {
            name: "Bariloche FULL",
            link: "barilochefull.pdf"
          }
        ]
      }, {
        name: "Camboriú",
        files: [
          {
            name: "Camboriú 1",
            link: "camboriúeco.pdf"
          }, {
            name: "Camboriú 2",
            link: "camboriúlight.pdf"
          }, {
            name: "Camboriú 3",
            link: "camboriúfull.pdf"
          }
        ]
      }
  ]}, {
    name: "Mixtos",
    destinations: [{
      name: "Bariloche y Sur de Chile",
      files: [
        {
          name: "Bariloche y Sur de Chile 1",
          link: "barilochesurdechileeco.pdf"
        }, {
          name: "Bariloche y Sur de Chile 2",
          link: "barilochesurdechilelight.pdf"
        }, {
          name: "Bariloche y Sur de Chile 3",
          link: "barilochesurdechilefull.pdf"
        }
      ]
    }
  ]}
];

export const TRAVELS = [
  {
    zone: "Nacional",
    img: "assets/custom-program-images/nacional.jpg",
    description:
      "Destinos a Pucón o Sur de Chile",
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
      "Destinos a San Carlos de Bariloche y Camboriú",
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
    zone: "Mixtos",
    img: "assets/custom-program-images/mixto.jpg",
    description: "Destino a Bariloche y Sur de Chile.",
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
