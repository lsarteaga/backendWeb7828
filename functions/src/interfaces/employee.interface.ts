export interface EmployeeInterface {
  idemployee?: string;
  name: string;
  surname: string;
  cardId: string;
  profession: string;
  address: string;
  phone: string;
  email: string;
  created_by?: string;
  created_at: string;
}

export function Employee(data: any, id?: string, username?: string) {
  const { name, surname, cardId, profession, address, phone, email } = data;
  const object: EmployeeInterface = {
    idemployee: id,
    name: name,
    surname: surname,
    cardId: cardId,
    profession: profession,
    address: address,
    phone: phone,
    email: email,
    created_by: username,
    created_at: new Date().toUTCString(),
  };
  return object;
}
