import { User } from "./user";

export interface Notification {
  id: number;
  user: User;
  title: string;
  topic: string;
  date: string;
  time: string;
  body: string;
  isSeen: number | boolean;
  url: string;
}
