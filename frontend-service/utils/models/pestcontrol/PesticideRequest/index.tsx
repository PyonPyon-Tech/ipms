import { User } from "@models/user";
import { Pesticide } from "../Pesticide";

export interface PesticideRequest {
  pesticide: Pesticide
  user: User
  amount: number
}