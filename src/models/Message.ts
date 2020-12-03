import { IMessage, User } from "react-native-gifted-chat";

export class Message implements IMessage {
    _id: string | number;
    text: string;
    createdAt: number | Date;
    user: User;
    image?: string | undefined;
    timestamp?: number;
    video?: string | undefined;
    audio?: string | undefined;
    system?: boolean | undefined;
    sent?: boolean | undefined;
    received?: boolean | undefined;
    pending?: boolean | undefined;
    constructor(_id: string, text: string, createdAt: Date, user: User) {
        this._id = _id;
        this.text = text;
        this.createdAt = createdAt;
        this.user = user;
    }
}
