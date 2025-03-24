import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

const apiSts = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'Failure',
  inprogress: 'INPROGRESS',
}
class GetProfile extends Component {
  state = {fullname: '', role: '', prfUrl: '', apiStsData: apiSts.initial}

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({apiStsData: apiSts.inprogress})
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt-token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.setState({
        fullname: data.profile_details.name,
        prfUrl: data.profile_details.profile_image_url,
        role: data.profile_details.short_bio,
        apiStsData: apiSts.success,
      })
    } else {
      this.setState({apiStsData: apiSts.failure})
    }
  }

  onRetryProfile = () => {
    this.getProfileData()
  }

  onFailure = () => (
    <button onClick={this.onRetryProfile} type="button">
      Retry
    </button>
  )

  onLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onSuccess = () => {
    const {fullname, role, prfUrl} = this.state
    return (
      <div className="profilediv">
        <img className="prfimg" src={prfUrl} alt={fullname} />
        <h1>{fullname}</h1>
        <p>{role}</p>
      </div>
    )
  }

  render() {
    const {apiStsData} = this.state
    switch (apiStsData) {
      case apiSts.success:
        return this.onSuccess()
      case apiSts.failure:
        return this.onFailure()
      case apiSts.inprogress:
        return this.onLoading()
      default:
        return null
    }
  }
}
export default GetProfile
