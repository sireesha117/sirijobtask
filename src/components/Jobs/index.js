import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'

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
        company_logo_url: eachItem.company_logo_url,
        employment_type: eachItem.employment_type,
        id: eachItem.id,
        job_description: eachItem.job_description,
        location: eachItem.location,
        package_per_annum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({apiStsData: apiSts.success, jobbyData: formattedArray})
    } else {
      this.setState({apiStsDatas: apiSts.failure})
    }
  }

  onCheck = id => {
    this.setState(prevState => {
      if (prevState.checkBox.includes(id)) {
        return {checkBox: prevState.checkBox.filter(item => item !== id)}
      }
      return {checkBox: [...prevState.checkBox, id]}
    })
  }

  onRadio = id => {
    this.setState({radioInput: id})
  }

  onEnter = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {radioInput, checkBox, searchInput, apiStsData} = this.state
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
            <div>
              <input
                className="seachinput"
                type="text"
                onChange={this.onEnter}
                value={searchInput}
              />
              <button type="button" data-testid="searchButton">
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div />
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
