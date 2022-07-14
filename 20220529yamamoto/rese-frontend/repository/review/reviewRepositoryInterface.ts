import { reviewRequest } from "~/types/axiosRequest";

export default interface reviewRepositoryInterface {
  register(sendData: reviewRequest): Promise<void>;
  update(id: number, sendData: reviewRequest): Promise<void>;
  delete(id: number): Promise<void>;
}