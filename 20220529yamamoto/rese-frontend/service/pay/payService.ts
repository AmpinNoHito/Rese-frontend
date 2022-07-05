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
    try {
      const res = await this.reservationRepository.getById(reservationId);
      return {
        reservation: res.reservation,
        amount: res.amount,
      }
    } catch (error: any) {
      throw error;
    }
  };

  async pay(reservationId: number, token: Stripe.Token, amount: number): Promise<void> {
    const sendData: sendData = {
      amount: amount,
      source: token.id,
    }

    try {
      const successMessage: string = await this.reservationRepository.pay(reservationId, sendData);
      alert(`${successMessage}\n\nマイページに遷移します。`);
    } catch (error: any) {
      throw error;
    }
  };
}