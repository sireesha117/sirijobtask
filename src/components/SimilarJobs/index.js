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
    <div className="similarJobsCard">
      <div>
        <img src={companyLogoUrl} alt={title} />
        <div>
          <h1>{title}</h1>
          <p>{rating}</p>
        </div>
        <h1>Description</h1>
        <p>{jobDescription}</p>
        <div className="fulltimerow">
          <p>{location}</p>
          <p>{employmentType}</p>
        </div>
      </div>
    </div>
  )
}
export default SimilarJobs
