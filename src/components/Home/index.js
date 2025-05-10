import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const Home = () => (
  <div className="home">
    <Header />
    <div className="homebg">
      <h1>Find The Job That Fits Your Life</h1>
      <div>
        {' '}
        <p>
          Millions of people are searching for jobs,salary,information,company
          <br />
          <br />
          reviews.Find the job that fits your abilities and potential.
        </p>
      </div>

      <Link to="/jobs">
        <button type="button" className="findjobs">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)
export default Home
