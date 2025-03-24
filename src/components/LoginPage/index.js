import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class LoginPage extends Component {
  state = {username: '', password: '', isErr: false, errMsg: ''}

  onUsername = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt-token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.push('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({isErr: true, errMsg: errorMsg})
  }

  onSubmitForm = async () => {
    const {username, password} = this.state
    const loginData = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(loginData),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  // usernameEle = () => {
  //   const {username} = this.state
  //   return (

  //   )
  // }

  // passwordEle = () => {
  //   const {password} = this.state
  // }

  render() {
    const {isErr, errMsg, username, password} = this.state
    const jwtToken = Cookies.get('jwt-token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-main">
        <div className="card">
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form onSubmit={this.onSubmitForm}>
            <div>
              <label htmlFor="username">USERNAME</label>
              <div>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={this.onUsername}
                  placeholder="Username"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password">PASSWORD</label>
              <div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={this.onPassword}
                  placeholder="Password"
                />
              </div>
            </div>

            <p>{isErr && <p>{errMsg}</p>}</p>
            <div>
              {' '}
              <button className="login" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default LoginPage
