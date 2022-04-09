import { IBase } from "./base";
import { IPlanet } from "./planets";
import { IUser } from "./user";

export interface IPost extends IBase {
    likes: string[];
    text: string;
    userId: IUser;
    planetId: IPlanet;
}