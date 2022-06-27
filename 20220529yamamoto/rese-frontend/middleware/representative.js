export default function representative({store, redirect}) {
  if (!store.state.user) {
    return redirect('/login');
  } else if (store.state.user.group !== 10) {
    return redirect('/');
  }
};