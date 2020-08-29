export interface ClientInterface {
  idclient?: string;
  name: string;
  surname: string;
  cardId: string;
  phone: string;
  direction: string;
}

export function Client(data: any, id?: string) {
  const { name, surname, cardId, phone, direction } = data;
  let object: ClientInterface = {
    idclient: id,
    name: name,
    surname: surname,
    cardId: cardId,
    phone: phone,
    direction: direction,
  };
  return object;
}

