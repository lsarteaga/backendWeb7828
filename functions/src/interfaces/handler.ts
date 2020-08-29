import { Response } from "express";

export function handleError(response: Response, error: any) {
  return response.status(500).send({
    message: `${error.code} - ${error.message}`,
  });
}
