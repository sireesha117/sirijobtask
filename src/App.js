import './App.css'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import LoginPage from './components/LoginPage'
import Jobs from './components/Jobs'
import SpecificJobDetails from './components/SpecificJobDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact to="/" component={Home} />
      <ProtectedRoute exact to="/login" component={LoginPage} />
      <ProtectedRoute exact to="/jobs" component={Jobs} />
      <ProtectedRoute exact to="/jobs/:id" component={SpecificJobDetails} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
