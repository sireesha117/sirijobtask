import {Route, Redirect} from 'react-router-com'
import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  const jwtToken = Cookies.get('jwt-token')
  if (jwtToken === undefined) {
    return <Redirect to='/login' />
  }
  return <Route {...props} />
}
export default ProtectedRoute
