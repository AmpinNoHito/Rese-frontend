import { sendData } from "~/types/api";
import { tokenResponse, userResponse } from "~/types/axiosResponse";

export default interface userRepositoryInterface {
  register(sendData: sendData): Promise<void>;
  registerRepresentative(sendData: sendData): Promise<void>;
  login(sendData: sendData): Promise<tokenResponse>;
  logout(): Promise<void>;
  getUser(token?: string): Promise<userResponse>;
}