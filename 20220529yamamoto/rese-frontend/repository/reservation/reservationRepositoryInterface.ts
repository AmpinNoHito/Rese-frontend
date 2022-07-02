import { reservation, sendData } from "~/types/api";

export default interface reservationRepositoryInterface {
  register(sendData: sendData): Promise<reservation>;
  getById(id: number): Promise<reservation>;
  getByUserId(userId: number): Promise<reservation[]>;
  update(id: number, sendData: sendData): Promise<void>;
  delete(id: number): Promise<void>;
  pay(id: number, sendData: sendData): Promise<string>;
  visit(id: number): Promise<void>;
}