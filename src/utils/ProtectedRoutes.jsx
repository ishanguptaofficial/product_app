import { useContext } from 'react'
import { Route, Navigate } from 'react-router-dom'
import { AuthContext } from '../utils/authContext'
import AppSidebar from '../component/AppSidebar'
import AppHeader from '../component/AppHeader'
import Signin from '../page/signin'
const ProtectedRoute = ({ component: Component, restrictedTo, ...rest }) => {
  const { loggedIn, user } = useContext(AuthContext)
  console.log(loggedIn, user);
  if (loggedIn && restrictedTo) {
    return restrictedTo.includes(user.role === 1) ? <Component {...rest} /> : <Navigate to="/" />
  } else if (loggedIn) {
    return (
      <>
      
        <AppSidebar />
        <AppHeader />
        <Component {...rest} />
      </>
    )
  } else {
    return (
      <>
        <Signin />
      </>
    )
  }
}

export default ProtectedRoute
