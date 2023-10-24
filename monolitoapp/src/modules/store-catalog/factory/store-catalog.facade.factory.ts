import StoreCatalogFacade from "../facade/store-catalog.facade";
import StoreCatalogFacadeInterface from "../facade/store-catalog.facade.interface";
import ProductRepository from "../repository/product.repository";
import FindAllProductsUseCase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUseCase from "../usecase/find-product/find-products.usecase";

export default class StoreCatalogFacadeFactory {
  static create(): StoreCatalogFacadeInterface {
    const repository = new ProductRepository();
    const findProductsUseCase = new FindProductUseCase(repository);
    const findAllProductsUseCase = new FindAllProductsUseCase(repository);
    const storeCatalogFacade = new StoreCatalogFacade({
      findUseCase: findProductsUseCase,
      findAllUseCase: findAllProductsUseCase,
    });

    return storeCatalogFacade;
  }
}