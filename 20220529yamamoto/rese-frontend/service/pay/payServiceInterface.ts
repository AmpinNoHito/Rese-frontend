import { Stripe } from 'stripe';
import { payInitData } from "~/types/pageInitData";

export default interface payServiceInterface {
  getData(reservationId: number): Promise<payInitData>;
  pay(reservationId: number, token: Stripe.Token, amount: number): Promise<void>;
}