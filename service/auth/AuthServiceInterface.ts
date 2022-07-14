import { User } from "~/types/api";
import { Location } from 'vue-router';
import { Dictionary } from 'vue-router/types/router';
import { AuthRequest } from "~/types/axiosRequest";

export default interface AuthServiceInterface {
  register(form: AuthRequest): Promise<void>;
  registerRepresentative(form: AuthRequest): Promise<AuthRequest>; 
  login(form: AuthRequest, query: Dictionary<string | (string | null)[]>): Promise<[string, User, Location]>;
  logout(): Promise<void>;
}