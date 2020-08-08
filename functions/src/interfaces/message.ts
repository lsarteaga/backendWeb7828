export interface Message {
    title: string;
    text: string;
    icon: string;
}

export function Message(title:string, text:string, icon: string){
    let message :Message = {
        title: title,
        text: text,
        icon: icon
    }
    return message;
}
