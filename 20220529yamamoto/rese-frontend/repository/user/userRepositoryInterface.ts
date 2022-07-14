import { authRequest } from "~/types/axiosRequest";
import { tokenResponse, userResponse } from "~/types/axiosResponse";

export default interface userRepositoryInterface {
  register(sendData: authRequest): Promise<void>;
  registerRepresentative(sendData: authRequest): Promise<void>;
  login(sendData: authRequest): Promise<tokenResponse>;
  logout(): Promise<void>;
  getUser(token?: string): Promise<userResponse>;
}