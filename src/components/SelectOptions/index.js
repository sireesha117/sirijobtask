import './index.css'

const SelectOptions = props => {
  const {employmentTypesList, salaryRangesList, onCheck, onRadio} = props

  const onCheckBoxSelect = event => {
    onCheck(event.target.id)
  }

  const onRadioSelect = event => {
    onRadio(event.target.id)
  }

  return (
    <div>
      <hr />
      <h1>Type of Employement</h1>
      <div>
        {employmentTypesList.map(eachItem => (
          <div className="row">
            <input
              className="input1"
              type="checkbox"
              id={eachItem.employmentTypeId}
              onChange={onCheckBoxSelect}
            />

            <label htmlFor={eachItem.employmentTypeId}>
              {eachItem.employmentTypeId}
            </label>
          </div>
        ))}
      </div>
      <div>
        <hr />
        <h1>Salary Range</h1>
        <div>
          {salaryRangesList.map(eachItem => (
            <div className="row">
              <input
                className="input1"
                type="radio"
                name="salaryRange"
                id={eachItem.salaryRangeId}
                onChange={onRadioSelect}
              />
              <label htmlFor={eachItem.salaryRangeId}>
                {eachItem.salaryRangeId}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default SelectOptions
