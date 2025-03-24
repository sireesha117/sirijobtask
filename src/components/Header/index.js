import './index.css'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const {history} = props
  // const jwtToken = Cookies.get('jwt-token')

  const onLogoutClick = () => {
    Cookies.remove('jwt-token')

    history.push('/login')
  }

  return (
    <div className="nav">
      <img
        className="headlogo"
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
      />
      <ul>
        <Link className="nolink" to="/">
          <li>Home</li>
        </Link>
        <Link className="nolink" to="/jobs">
          <li>Jobs</li>
        </Link>
      </ul>
      <button className="logout" type="button" onClick={onLogoutClick}>
        Logout
      </button>
    </div>
  )
}
export default withRouter(Header)
