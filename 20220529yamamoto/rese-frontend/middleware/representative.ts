import { Context } from "@nuxt/types";
import { user } from "~/types/api";

export default function representative({ redirect, app: { $accessor } }: Context): void {
  const user = $accessor.user as user;
  if (!$accessor.loggedIn) {
    return redirect('/login');
  } else if (user.group !== 10) {
    return redirect('/');
  }
};