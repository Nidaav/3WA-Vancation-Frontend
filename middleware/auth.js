export default function ({ route, store, redirect }) {
//   console.log('connecteUser', store.state.users.connectedUser)
//   if (!store.state.users.connectedUser) {
//     console.log('route.path:', route.path)
//     if (
//       route.path === '/' ||
//       route.path === '/login' ||
//       route.path === '/login/register'
//     ) {
//       //
//     } else {
//       return redirect('/login?message=Vous devez vous connecter pour accéder à cette page')
//     }
//   } else if (store.state.users.connectedUser) {
//     const userRole = store.state.users.connectedUser.role
//     console.log('userRole:', userRole)

//     if (userRole === 3) {
//       // User with role 3 (admin) has access to all pages, so no further action needed.
//     } else if (userRole === 2) {
//       // User with role 2 (org) does not have access to '/admin', so redirect to a different page.
//       if (route.path === '/ad_min' || route.path === '/bookings') {
//         // redirect('/unauthorized')
//         return redirect("/?message=Vous n'avez pas les droits d'accès à cette page")
//       }
//     } else if (userRole === 1) {
//       // User with role 1 (user) does not have access to '/admin', so redirect to a different page.
//       console.log('route.path:', route.path)
//       if (
//         route.path === '/ad_min' ||
//         route.path === '/vans/orgVans' ||
//         route.path === '/bookings/orgBookings'
//       ) {
//         // redirect('/unauthorized')
//         return redirect("/?message=Vous n'avez pas les droits d'accès à cette page")
//       }
//     } else {
//       // Handle unknown or unsupported roles
//       // Redirect to an unauthorized page or show an error message
//       // redirect('/unauthorized')
//       return redirect("/?message=Vous n'avez pas les droits d'accès à cette page")
//     }
//   }
}
