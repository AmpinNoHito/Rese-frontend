import { user, sendData } from "~/types/api";

export default interface userRepositoryInterface {
  register(sendData: sendData): Promise<void>;
  registerRepresentative(sendData: sendData): Promise<void>;
  login(sendData: sendData): Promise<[string, user]>;
  logout(): Promise<void>;
  getUser(token?: string): Promise<user>;
}