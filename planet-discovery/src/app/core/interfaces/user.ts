import { IBase } from "./base";

export interface IUser extends IBase {
    planets: string[];
    posts: string[];
    country: string;
    email: string;
    username: string;
    password: string;
}