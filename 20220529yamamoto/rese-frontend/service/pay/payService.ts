import reservationRepositoryInterface from "~/repository/reservation/reservationRepositoryInterface";
import payServiceInterface from "./payServiceInterface";
import { payInitData } from "~/types/pageData";
import { payRequest } from "~/types/axiosRequest";

export default class payService implements payServiceInterface {
  readonly reservationRepository: reservationRepositoryInterface;

  constructor(reservationRepository: reservationRepositoryInterface) {
    this.reservationRepository = reservationRepository;
  }

  async getData(reservationId: number): Promise<payInitData> {
    const res = await this.reservationRepository.getById(reservationId)
      .catch(error => {
        throw error;
      })

    return {
      reservation: res.data.data,
    };
  };

  async pay(reservationId: number, tokenId: string, amount: number): Promise<void> {
    const sendData: payRequest = {
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