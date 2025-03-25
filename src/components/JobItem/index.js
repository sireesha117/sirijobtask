import './index.css'

const JobItem = props => {
  const {data} = props
  const {
    companyLogoUrl,
    employmentType,

    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = data
  return (
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
  )
}
export default JobItem
