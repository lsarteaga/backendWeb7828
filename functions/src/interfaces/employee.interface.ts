export interface EmployeeInterface {
  idemployee?: string;
  name: string;
  surname: string;
  cardId: string;
  profession: string;
  direction: string;
  phone: string;
}

export function Employee(data: any, id?: string) {
  const { name, surname, cardId, profession, direction, phone } = data;
  const object: EmployeeInterface = {
    idemployee: id,
    name: name,
    surname: surname,
    cardId: cardId,
    profession: profession,
    direction: direction,
    phone: phone,
  };
  return object;
}
