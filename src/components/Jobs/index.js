import './index.css'
import {Component} from 'react'
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

  render() {
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
            <p>right</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
