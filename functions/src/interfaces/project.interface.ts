import {ClientInterface} from "./client.interface";
import {EmployeeInterface} from "./employee.interface";

export interface ProjectInterface {
    idproject?: string;
    kind: string;
    dateInit: string;
    dateFinish: string;
    direction: string;
    state: string;
    cost: number;
    description: string;
    idemployee: string;
    idclient: string;
    client?: ClientInterface;
    employee?: EmployeeInterface;
}

export function Project(data: any, id?: string) {
    const { kind, dateInit, dateFinish, direction, state, cost, description, idemployee, idclient } = data;
    let object: ProjectInterface = {
        idproject: id,
        kind: kind === undefined ? null : kind,
        dateInit: dateInit === undefined ? null : dateInit,
        dateFinish: dateFinish === undefined ? null : dateFinish,
        direction: direction === undefined ? null : direction,
        state: state === undefined ? null : state,
        cost: cost === undefined ? null : cost,
        description: description === undefined ? null : description,
        idemployee: idemployee === undefined ? null : idemployee,
        idclient: idclient === undefined ? null : idclient
    };
    return object;
}



