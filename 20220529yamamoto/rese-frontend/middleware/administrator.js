export default function administrator({store, redirect}) {
  if (!store.state.user) {
    return redirect('/login');
  } else if (store.state.user.group !== 100) {
    return redirect('/');
  }
};