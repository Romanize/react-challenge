/* eslint-disable no-console */

import { User } from "../types/types";

// We can do analytics, or save logs on server here.
export class LoggerService {
  user: User;

  constructor(user: User) {
    this.user = user;
  }

  info = (s: string) => console.log(this.user.id, s);

  static warn = (s: string) => console.warn(s);

  static table = (s: string) => console.table(s);

  static error = (s: string) => console.error(s);
}
