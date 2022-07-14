import { user } from "~/types/api";
import { Location } from 'vue-router';
import { Dictionary } from 'vue-router/types/router';
import { authRequest } from "~/types/axiosRequest";

export default interface authServiceInterface {
  register(form: authRequest): Promise<void>;
  registerRepresentative(form: authRequest): Promise<authRequest>; 
  login(form: authRequest, query: Dictionary<string | (string | null)[]>): Promise<[string, user, Location]>;
  logout(): Promise<void>;
}