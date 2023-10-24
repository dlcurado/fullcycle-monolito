import { AddProductFacadeInputDto, CheckStockFacadeInputDto, CheckStockFacadeOutputDto } from "./product-adm.facade.dto"

export default interface ProductAdmFacadeInterface {
  addProduct(product: AddProductFacadeInputDto): Promise<void>;
  checkStock(product: CheckStockFacadeInputDto): Promise<CheckStockFacadeOutputDto>;
}