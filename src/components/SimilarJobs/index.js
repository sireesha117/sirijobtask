import './index.css'

const SimilarJobs = props => {
  const {data} = props
  const {
    companyLogoUrl,
    employmentType,

    jobDescription,
    location,
    rating,
    title,
  } = data

  return (
    <li className="similarJobsCard">
      <div>
        <div className="row">
          <img className="simiimg" src={companyLogoUrl} alt={title} />
          <div className="mar">
            <h1 className="marginless">{title}</h1>
            <p className="marginless">{rating}</p>
          </div>
        </div>

        <h1>Description</h1>
        <p>{jobDescription}</p>
        <div className="fulltimerow">
          <p className="space">{location}</p>
          <p>{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobs
