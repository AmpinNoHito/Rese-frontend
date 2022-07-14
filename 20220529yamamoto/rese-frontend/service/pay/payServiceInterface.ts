import { payInitData } from "~/types/pageData";

export default interface payServiceInterface {
  getData(reservationId: number): Promise<payInitData>;
  pay(reservationId: number, tokenId: string, amount: number): Promise<void>;
}