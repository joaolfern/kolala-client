import type { IProfile } from "./Profile";

export type UserLevel = "user" | "admin";

export interface IAccount {
  id: number;
  email: string;
  status: number;
  authMethod: string;
  authKey: string;
  level: UserLevel;
}

export type IUser = IAccount & { profile: IProfile };
