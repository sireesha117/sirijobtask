import './App.css'
import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import LoginPage from './components/LoginPage'
import Jobs from './components/Jobs'
import SpecificJobDetails from './components/SpecificJobDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => (
  <>
    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <Route exact path="/login" component={LoginPage} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={SpecificJobDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App
