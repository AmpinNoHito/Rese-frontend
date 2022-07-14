import { ReviewRequest } from "~/types/axiosRequest";

export default interface ReviewRepositoryInterface {
  register(sendData: ReviewRequest): Promise<void>;
  update(id: number, sendData: ReviewRequest): Promise<void>;
  delete(id: number): Promise<void>;
}