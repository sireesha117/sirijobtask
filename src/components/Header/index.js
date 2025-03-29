import './index.css'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const {history} = props

  const onLogoutClick = () => {
    Cookies.remove('jwt-token')

    history.push('/login')
  }

  return (
    <div className="nav">
      <Link to="/">
        <img
          className="headlogo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>

      <ul className="header">
        <div>
          <Link className="nolink" to="/">
            <li className="lidata">Home</li>
          </Link>
          <Link className="nolink" to="/jobs">
            <li className="lidata">Jobs</li>
          </Link>
        </div>

        <li className="lidata">
          <button className="logout" type="button" onClick={onLogoutClick}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}
export default withRouter(Header)
