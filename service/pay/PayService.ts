import ReservationRepositoryInterface from "~/repository/reservation/ReservationRepositoryInterface";
import PayServiceInterface from "./PayServiceInterface";
import { PayInitData } from "~/types/pageData";
import { PayRequest } from "~/types/axiosRequest";

export default class PayService implements PayServiceInterface {
  readonly reservationRepository: ReservationRepositoryInterface;

  constructor(reservationRepository: ReservationRepositoryInterface) {
    this.reservationRepository = reservationRepository;
  }

  async getData(reservationId: number): Promise<PayInitData> {
    const res = await this.reservationRepository.getById(reservationId)
      .catch(error => {
        throw error;
      })

    return {
      reservation: res.data.data,
    };
  };

  async pay(reservationId: number, tokenId: string, amount: number): Promise<void> {
    const sendData: PayRequest = {
      amount: amount,
      source: tokenId,
    };

    await this.reservationRepository.pay(reservationId, sendData)
      .catch(error => {
        throw error;
      });
    alert('支払い処理が正常に完了しました。\n\nマイページに遷移します。');
  };
}