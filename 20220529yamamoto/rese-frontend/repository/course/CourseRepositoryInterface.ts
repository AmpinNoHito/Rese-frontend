import { CourseRequest } from "~/types/axiosRequest";


export default interface CourseRepositoryInterface {
  register(sendData: CourseRequest): Promise<void>;
  delete(id: number): Promise<void>;
}