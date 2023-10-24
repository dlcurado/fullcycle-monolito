import { 
  FindStoreCatalogFacadeInputDto, 
  FindStoreCatalogFacadeOutputDto,
  FindAllStoreCatalogFacadeOutputDto
} from "./store-catalog.facade.dto";

export default interface StoreCatalogFacadeInterface {
  find(product: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto>;
  findAll(): Promise<FindAllStoreCatalogFacadeOutputDto>;
}