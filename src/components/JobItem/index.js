import './index.css'
import {Link} from 'react-router-dom'

const JobItem = props => {
  const {data} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = data

  return (
    <Link className="deco" to={`/jobs/${id}`}>
      <li className="eachjob">
        <div className="row1">
          <img
            className="smallimg"
            src={companyLogoUrl}
            alt="job details company logo"
          />
          <div className="space">
            <h1 className="white">{title}</h1>
            <div>
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="row2">
          <div className="row1">
            <p>{location}</p>
            <p className="space">{employmentType}</p>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobItem
