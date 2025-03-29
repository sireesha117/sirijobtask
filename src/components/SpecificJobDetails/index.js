import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import SimilarJobs from '../SimilarJobs'
import Header from '../Header'

const apiSts = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'Failure',
  inprogress: 'INPROGRESS',
}
class SpecificJobDetails extends Component {
  state = {
    specificObj: {},
    specificArray: [],
    similarArray: [],
    lifeAtCompany: {},
    apiStatusData: apiSts.initial,
    // location: '',
    // packagePerAnnum: '',
    rating: 0,
  }

  componentDidMount() {
    this.getSpecific()
  }

  getSpecific = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatusData: apiSts.inprogress})

    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt-token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok) {
        const jobDetails = data.job_details

        const formattedObj = {
          companyLogoUrl: jobDetails.company_logo_url,
          companyWebsiteUrl: jobDetails.company_website_url,
          employmentType: jobDetails.employment_type,
          id: jobDetails.id,
          jobDescription: jobDetails.job_description,
          location: jobDetails.location,
          packagePerAnnum: jobDetails.package_per_annum,
          rating: jobDetails.rating,
        }

        const formattedArray = jobDetails.skills.map(eachItem => ({
          imageUrl: eachItem.image_url,
          name: eachItem.name,
        }))

        const similarFormatted = data.similar_jobs.map(eachItem => ({
          companyLogoUrl: eachItem.company_logo_url,
          employmentType: eachItem.employment_type,
          id: eachItem.id,
          jobDescription: eachItem.job_description,
          location: eachItem.location,
          rating: eachItem.rating,
          title: eachItem.title,
        }))

        const lifeFormatted = {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        }

        this.setState({
          apiStatusData: apiSts.success,
          specificObj: formattedObj,
          lifeAtCompany: lifeFormatted,
          specificArray: formattedArray,
          similarArray: similarFormatted,
        })
      } else {
        this.setState({apiStatusData: apiSts.failure})
      }
    } catch (error) {
      console.error('Error fetching job details:', error)
      this.setState({apiStatusData: apiSts.failure})
    }
  }

  onFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>we can not seem to find the page you are looking for.</p>
      <button type="button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  onLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onSuccess = () => {
    const {
      specificObj,
      rating,
      lifeAtCompany,
      similarArray,
      specificArray,
      // packagePerAnnum,
    } = this.state

    return (
      <div className="bg">
        <div className="card">
          <div className="website">
            <img
              className="specificlogo"
              src={specificObj.companyLogoUrl}
              alt={specificObj.id}
            />
            <div className="space">
              <h1 className="marginless">{similarArray[0].title}</h1>
              <p className="marginless">{rating}</p>
            </div>
          </div>
          <div className="locationrow">
            <div className="row">
              <p className="space">{specificObj.location}</p>
              <p className="space">{specificObj.employmentType}</p>
            </div>
            <p>{specificObj.packagePerAnnum}</p>
          </div>
          <hr />
          <div className="descriptionrow">
            <h1>Description</h1>
            <a className="deco" href={specificObj.companyWebsiteUrl}>
              Visit
            </a>
          </div>
          <p>{specificObj.jobDescription}</p>
          <h1>Skills</h1>
          <ul className="skills">
            {specificArray.map(eachItem => (
              <li className="skillrow" key={eachItem.name}>
                <img
                  className="skillimg"
                  src={eachItem.imageUrl}
                  alt={eachItem.name}
                />
                <p>{eachItem.name}</p>
              </li>
            ))}
          </ul>
          <h1>Life at Company</h1>
          <div className="lifeatcompanyrow">
            <p>{lifeAtCompany.description}</p>
            <img className="lifeimg" src={lifeAtCompany.imageUrl} alt="life" />
          </div>
        </div>
        <h1>Similar Jobs</h1>
        <ul className="sjobs">
          {similarArray.map(eachItem => (
            <SimilarJobs data={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {apiStatusData} = this.state

    return (
      <div>
        <Header />
        {(() => {
          switch (apiStatusData) {
            case apiSts.inprogress:
              return this.onLoading()
            case apiSts.success:
              return this.onSuccess()
            case apiSts.failure:
              return this.onFailure()
            default:
              return null
          }
        })()}
      </div>
    )
  }
}
export default SpecificJobDetails
