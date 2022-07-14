import { Context } from "@nuxt/types";

export default function administrator({ redirect, app: { $accessor } }: Context): void {
  if (!$accessor.loggedIn) {
    return redirect('/login');
  } else if ($accessor.user.group !== 100) {
    return redirect('/');
  }
};