import { sendData } from "~/types/api";
import { Stripe } from 'stripe';
import reservationRepositoryInterface from "~/repository/reservation/reservationRepositoryInterface";
import payServiceInterface from "./payServiceInterface";
import { payInitData } from "~/types/pageData";

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

  async pay(reservationId: number, token: Stripe.Token, amount: number): Promise<void> {
    const sendData: sendData = {
      amount: amount,
      source: token.id,
    }

    await this.reservationRepository.pay(reservationId, sendData)
      .catch(error => {
        throw error;
      })
    alert(`支払い処理が正常に完了しました。\n\nマイページに遷移します。`);
  };
}