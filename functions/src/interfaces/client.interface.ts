export interface ClientInterface {
    idclient?: string;
    name: string;
    cardId: string;
    phone: string;
    direction: string;
}

export function Client(data: any, id?: string) {
    const { name, cardId, phone, direction  } = data;
    let object: ClientInterface = {
        idclient: id,
        name: name === undefined ? null : name,
        cardId: cardId === undefined ? null : cardId,
        phone: phone === undefined ? null : phone,
        direction: direction === undefined ? null : direction
    };
    return object;
}

