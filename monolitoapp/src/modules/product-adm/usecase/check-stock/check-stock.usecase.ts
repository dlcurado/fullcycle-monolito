import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";
import { CheckStockInputDto, CheckStockOutputDto } from "./check-stock.dto";

export default class CheckStockUseCase implements UseCaseInterface {
  private repository: ProductGateway;
  constructor(repository: ProductGateway) {
    this.repository = repository;
  }
  
  async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto> {
    const product = await this.repository.find(input.productId);
    return {
      productId: product.id.id,
      stock: product.stock,
    }
  }

}