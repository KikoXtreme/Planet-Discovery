import { IBase } from "./base";
import { IUser } from "./user";

export interface IPlanet<T = string> extends IBase {
    subscribers: string[];
    posts: T[];
    planetName: string;
    userId: IUser;
}