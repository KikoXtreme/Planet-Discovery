import { IBase } from "./base";
// import { IPost } from "./post";
import { IUser } from "./user";

// Option 1
// export interface ITheme extends IBase {
//     subscribers: string[];
//     posts: string[];
//     themeName: string;
//     userId: IUser;
// }

// export interface IThemeWithPost extends IBase {
//     subscribers: string[];
//     posts: IPost[];
//     themeName: string;
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
// export interface ITheme extends IBase {
//     subscribers: string[];
//     posts: (string | IPost)[];
//     themeName: string;
//     userId: IUser;
// }