import express, { Request, Response } from "express";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/product-adm.facade.factory";

export const productRoute = express.Router();

productRoute.post('/', async (req: Request, res: Response) => {
  const productFacade = ProductAdmFacadeFactory.create();
  const product = {
    name: req.body.name,
    description: req.body.description,
    purchasePrice: req.body.purchasePrice,
    stock: req.body.stock
  }
  const output = await productFacade.addProduct(product);
  res.send(output);
});