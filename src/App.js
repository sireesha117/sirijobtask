import './App.css'
import {Switch, Route} from 'react-router-dom'
import JobApp from './components/JobApp'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact to="/" component={Home} />
      <Route exact to="/login" component={LoginPage} />
      <Route exact to="/" component={Home} />
    </Switch>
  </>
)

export default App
