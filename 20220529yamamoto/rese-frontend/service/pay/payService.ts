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
    return await Promise.resolve(this.reservationRepository.getById(reservationId))
      .then(res => {
        const reservation = res.data.data;
        return {
          reservation: reservation,
        }
      });
  };

  async pay(reservationId: number, token: Stripe.Token, amount: number): Promise<void> {
    const sendData: sendData = {
      amount: amount,
      source: token.id,
    }

    await Promise.resolve(this.reservationRepository.pay(reservationId, sendData))
      .then(res => alert(`支払い処理が正常に完了しました。\n\nマイページに遷移します。`))
      .catch(error => {
        throw error;
      })
  };
}