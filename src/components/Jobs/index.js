import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobItem from '../JobItem'
import GetProfile from '../GetProfile'
import SelectOptions from '../SelectOptions'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiSts = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'Failure',
  inprogress: 'INPROGRESS',
}

class Jobs extends Component {
  state = {
    checkBox: [],
    radioInput: '',
    searchInput: '',
    apiStsData: apiSts.initial,
    jobbyData: [],
  }

  componentDidMount() {
    this.getJobbyData()
  }

  onRetry = () => {
    this.getJobbyData()
  }

  getJobbyData = async () => {
    const {checkBox, radioInput, searchInput} = this.state
    this.setState({apiStsData: apiSts.inprogress})
    const url = `https://apis.ccbp.in/jobs?employment_type=${checkBox.join(
      ',',
    )}&minimum_package=${radioInput}&search=${searchInput}`
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
      const formattedArray = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({apiStsData: apiSts.success, jobbyData: formattedArray})
    } else {
      this.setState({apiStsData: apiSts.failure})
    }
  }

  onCheck = id => {
    this.setState(prevState => {
      if (prevState.checkBox.includes(id)) {
        return {checkBox: prevState.checkBox.filter(item => item !== id)}
      }
      return {checkBox: [...prevState.checkBox, id]}
    }, this.getJobbyData)
  }

  onRadio = id => {
    this.setState({radioInput: id}, this.getJobbyData)
  }

  onEnter = event => {
    this.setState({searchInput: event.target.value}, this.getJobbyData)
  }

  onLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

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

  onSuccess = () => {
    const {jobbyData, searchInput} = this.state
    return jobbyData.length === 0 ? (
      <div className="nojobs">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1>No Jobs Found</h1>
        <p>We could not found any jobs.Try other filters.</p>
      </div>
    ) : (
      <div>
        <div className="borderforsearch">
          <input
            className="seachinput"
            type="search"
            onChange={this.onEnter}
            value={searchInput}
          />
          <button
            className="seachicon"
            type="button"
            data-testid="searchButton"
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <ul className="ul1">
          {jobbyData.map(eachItem => (
            <JobItem data={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  getSwitch = () => {
    const {apiStsData} = this.state
    switch (apiStsData) {
      case apiSts.inprogress:
        return this.onLoading()
      case apiSts.success:
        return this.onSuccess()
      case apiSts.failure:
        return this.onFailure()
      default:
        return null
    }
  }

  render() {
    const {radioInput, checkBox} = this.state
    console.log(radioInput, checkBox)
    return (
      <div>
        <Header />
        <div className="jobtab">
          <div className="left">
            <GetProfile />
            <SelectOptions
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              onCheck={this.onCheck}
              onRadio={this.onRadio}
            />
          </div>
          <div className="right">
            <div>{this.getSwitch()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
