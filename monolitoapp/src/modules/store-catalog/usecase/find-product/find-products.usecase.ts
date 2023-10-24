import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";
import { FindProductInputDto, FindProductOutputDto } from "./find-products.dto";

export default class FindProductUseCase implements UseCaseInterface {
  private _repository: ProductGateway;

  constructor(productGateway: ProductGateway) {
    this._repository = productGateway;
  }

  async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {
    const product = await this._repository.find(input.id);

    return {
        id: product.id.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
    };
  }
}