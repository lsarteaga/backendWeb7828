export interface ClientInterface {
  idclient?: string;
  name: string;
  surname: string;
  cardId: string;
  phone: string;
  address: string;
  created_by?: string;
  created_at: string;
}

export function Client(data: any, id?: string, username?: string) {
  const { name, surname, cardId, phone, address } = data;
  let object: ClientInterface = {
    idclient: id,
    name: name,
    surname: surname,
    cardId: cardId,
    phone: phone,
    address: address,
    created_by: username,
    created_at: new Date().toUTCString(),
  };
  return object;
}
