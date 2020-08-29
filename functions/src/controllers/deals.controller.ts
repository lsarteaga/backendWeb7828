import { Response, Request } from "express";

export function showDeals(request: Request, response: Response) {
  let jsonResponse = {
    handsetCards: [
      { imageName: "clients2", title: "Nuestros Clientes", cols: 2, rows: 1 },
      { imageName: "team", title: "Nuestro Equipo", cols: 1, rows: 1 },
      {
        imageName: "project",
        title: "Conoce Nuestros Proyectos",
        cols: 1,
        rows: 2,
      },
      {
        imageName: "stadistics",
        title: "Mira Nuestras Estadisticas",
        cols: 1,
        rows: 1,
      },
    ],
    webCards: [
      { imageName: "clients2", title: "Nuestros Clientes", cols: 2, rows: 1 },
      { imageName: "team", title: "Nuestro Equipo", cols: 1, rows: 1 },
      {
        imageName: "project",
        title: "Conoce Nuestros Proyectos",
        cols: 1,
        rows: 2,
      },
      {
        imageName: "stadistics",
        title: "Mira Nuestras Estadisticas",
        cols: 1,
        rows: 1,
      },
    ],
  };
  response.json(jsonResponse);
}
