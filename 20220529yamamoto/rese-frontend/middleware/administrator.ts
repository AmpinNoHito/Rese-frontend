import { Context } from "@nuxt/types";
import { user } from "~/types/api";

export default function administrator({ redirect, app: { $accessor } }: Context): void {
  const user = $accessor.user as user;
  if (!$accessor.loggedIn) {
    return redirect('/login');
  } else if (user.group !== 100) {
    return redirect('/');
  }
};