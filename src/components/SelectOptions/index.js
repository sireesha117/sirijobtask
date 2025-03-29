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
      <h1 className="white">Type of Employement</h1>
      <div className="mar-left">
        {employmentTypesList.map(eachItem => (
          <div className="row">
            <input
              className="input1"
              type="checkbox"
              id={eachItem.employmentTypeId}
              onChange={onCheckBoxSelect}
            />
            <label htmlFor={eachItem.employmentTypeId}>{eachItem.label}</label>
          </div>
        ))}
      </div>
      <div>
        <hr />
        <h1 className="white">Salary Range</h1>
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
              <label htmlFor={eachItem.salaryRangeId}>{eachItem.label}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default SelectOptions
