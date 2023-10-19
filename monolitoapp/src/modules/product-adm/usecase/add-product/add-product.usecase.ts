import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import { AddProductInputDto, AddProductOutputDto } from "./add-product.dto";

export default class AddProductUseCase implements UseCaseInterface {
  private _repository: ProductGateway;

  constructor(productGateway: ProductGateway) {
    this._repository = productGateway;
  }

  async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {
    const props = {
      id: new Id(input.id),
      name: input.name,
      description: input.description,
      purchasedPrice: input.purchasedPrice,
      stock: input.stock
    }
    const product = new Product(props);
    this._repository.add(product);

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasedPrice: product.purchasedPrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    };
  }
}