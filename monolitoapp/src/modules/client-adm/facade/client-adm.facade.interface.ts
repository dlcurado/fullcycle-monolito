import { AddClientFacadeInputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./client-adm.facade.dto";

export default interface ClientAdmFacadeInterface {
  add(client: AddClientFacadeInputDto): Promise<void>;
  find(client: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto>;
}