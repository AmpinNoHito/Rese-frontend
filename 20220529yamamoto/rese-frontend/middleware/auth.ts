import { Context } from "@nuxt/types";

export default function auth({ redirect, app: { $accessor } }: Context): void {
  if (!$accessor.loggedIn) {
    return redirect('/login');
  }
}