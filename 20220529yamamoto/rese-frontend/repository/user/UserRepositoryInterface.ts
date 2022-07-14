import { AuthRequest } from "~/types/axiosRequest";
import { tokenResponse, UserResponse } from "~/types/axiosResponse";

export default interface UserRepositoryInterface {
  register(sendData: AuthRequest): Promise<void>;
  registerRepresentative(sendData: AuthRequest): Promise<void>;
  login(sendData: AuthRequest): Promise<tokenResponse>;
  logout(): Promise<void>;
  getUser(token?: string): Promise<UserResponse>;
}