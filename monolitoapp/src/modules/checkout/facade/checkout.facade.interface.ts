import { AddOrderFacadeInputDto } from "./checkout.facade.dto";

export default interface CheckoutFacadeInterface {
  add(client: AddOrderFacadeInputDto): Promise<void>;
  //find(client: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto>;
}