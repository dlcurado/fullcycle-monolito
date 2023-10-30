import express, { Request, Response } from "express";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.factory";

export const clientRoute = express.Router();

clientRoute.post('/', async (req: Request, res: Response) => {
  const clientFacade = ClientAdmFacadeFactory.create();
  const client = {
    name: req.body.name,
    email: req.body.email,
    document: req.body.document,
    street: req.body.street, 
    number: req.body.number,
    complement: req.body.complement,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode
  }
  const output = await clientFacade.add(client);
  res.send(output);
});