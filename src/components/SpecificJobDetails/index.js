import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

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
    location: '',
    packagePerAnnum: '',
    rating: 0,
  }

  componentDidMount() {
    this.getSpecific()
  }

  getSpecific = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStsData: apiSts.inprogress})

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

        // Format the job details
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

        // Format the skills
        const formattedArray = jobDetails.skills.map(eachItem => ({
          imageUrl: eachItem.image_url,
          name: eachItem.name,
        }))

        // Format similar jobs
        const similarFormatted = data.similar_jobs.map(eachItem => ({
          companyLogoUrl: eachItem.company_logo_url,
          employmentType: eachItem.employment_type,
          id: eachItem.id,
          jobDescription: eachItem.job_description,
          location: eachItem.location,
          rating: eachItem.rating,
          title: eachItem.title,
        }))

        // Format life at company
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
}
export default SpecificJobDetails
