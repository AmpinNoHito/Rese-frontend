import { Context } from "@nuxt/types";

export default function representative({ redirect, app: { $accessor } }: Context): void {
  if (!$accessor.loggedIn) {
    return redirect('/login');
  } else if ($accessor.user.group !== 10) {
    return redirect('/');
  }
};