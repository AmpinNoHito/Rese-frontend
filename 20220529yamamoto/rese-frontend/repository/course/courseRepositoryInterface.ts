import { courseRequest } from "~/types/axiosRequest";


export default interface courseRepositoryInterface {
  register(sendData: courseRequest): Promise<void>;
  delete(id: number): Promise<void>;
}