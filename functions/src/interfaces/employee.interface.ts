export interface EmployeeInterface {
    idemployee?: string;
    name: string;
    cardId: string;
    profession: string;
    direction: string;
    phone: string;
}

export function Employee(data: any, id?: string) {
    const { name, cardId, profession, direction, phone } = data;
    const object: EmployeeInterface = {
        idemployee: id,
        name: name === undefined ? null : name,
        cardId: cardId === undefined ? null : cardId,
        profession: profession === undefined ? null : profession,
        direction: direction === undefined ? null : direction,
        phone: phone === undefined ? null : phone
    };
    return object;
}
