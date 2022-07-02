import { sendData, user } from "~/types/api";
import { RawLocation } from 'vue-router';
import { Dictionary } from 'vue-router/types/router';

export default interface authServiceInterface {
  register(form: sendData): Promise<void>;
  registerRepresentative(form: sendData): Promise<sendData>; 
  login(form: sendData, query: Dictionary<string | (string | null)[]>): Promise<[string, user, RawLocation]>;
  logout(): Promise<void>;
}