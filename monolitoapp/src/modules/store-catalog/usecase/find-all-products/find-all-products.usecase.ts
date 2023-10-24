import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";
import { FindAllProductsOutputDto } from "./find-all-products.dto";

export default class FindAllProductsUseCase implements UseCaseInterface {
  private _repository: ProductGateway;

  constructor(productGateway: ProductGateway) {
    this._repository = productGateway;
  }

  async execute(): Promise<any> {
    const products = await this._repository.findAll();

    return {
      products: products.map((product) => ({
        id: product.id.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      }))
    };
  }
}