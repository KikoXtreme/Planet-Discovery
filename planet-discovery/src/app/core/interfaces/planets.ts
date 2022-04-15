import { IBase } from "./base";
import { IPost } from "./post";
// import { IPost } from "./post";
import { IUser } from "./user";

// Option 1
// export interface IPlanet extends IBase {
//     subscribers: string[];
//     posts: string[];
//     planetName: string;
//     userId: IUser;
// }

// export interface IPlanetWithPost extends IBase {
//     subscribers: string[];
//     posts: IPost[];
//     planetName: string;
//     userId: IUser;
// }

// Option 2
export interface IPlanet<T = string> extends IBase {
    subscribers: string[];
    posts: T[];
    planetName: string;
    userId: IUser;
}

// Option 3
// export interface IPlanet extends IBase {
//     subscribers: string[];
//     posts: (string | IPost)[];
//     planetName: string;
//     userId: IUser;
// }