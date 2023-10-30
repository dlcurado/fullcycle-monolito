import ClientAdm from "../domain/client.entity";

export default interface ClientGateway {
  add(client: ClientAdm): Promise<void>;
  find(id: string): Promise<ClientAdm>;
}