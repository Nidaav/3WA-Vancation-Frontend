export default function ({ route, store, redirect }) {
  if (!store.state.users.connectedUser) {
    if (
      route.path === '/' ||
      route.path === '/login' ||
      route.path === '/login/register'
    ) {
      //
    } else {
      return redirect('/login')
    }
  } else if (store.state.users.connectedUser) {
    const userRole = store.state.users.connectedUser.role

    if (userRole === 3) {
      //
    } else if (userRole === 2) {
      if (route.path === '/ad_min' || route.path === '/bookings') {
        return redirect("/")
      }
    } else if (userRole === 1) {
      if (
        route.path === '/ad_min' ||
        route.path === '/vans/orgVans' ||
        route.path === '/bookings/orgBookings'
      ) {
        return redirect("/?message=Vous n'avez pas les droits d'accès à cette page")
      }
    } else {
      return redirect("/?message=Vous n'avez pas les droits d'accès à cette page")
    }
  }
}
