import { PayInitData } from "~/types/pageData";

export default interface PayServiceInterface {
  getData(reservationId: number): Promise<PayInitData>;
  pay(reservationId: number, tokenId: string, amount: number): Promise<void>;
}