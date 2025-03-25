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
    <Link to={`/jobs/${id}`}>
      <li>
        <img src={companyLogoUrl} alt={title} />
        <h1>{title}</h1>
        <p>{location}</p>
        <p>{employmentType}</p>
        <p>{location}</p>
        <p>{jobDescription}</p>
        <p>{packagePerAnnum}</p>
        <p>{rating}</p>
      </li>
    </Link>
  )
}
export default JobItem
