import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-widgets/styles.css'
import {
  HashRouter as Router,
  Route,
  Switch,
  useLocation
} from 'react-router-dom'

import { projects } from './Components/projects'
import PageHome from './Components/PageHome'
import Navbar from './Components/NavBar'
import './App.scss'
import './appConfig'

const App = () => {
  const location = useLocation()

  return (
    <div className='app-container'>
      <div className='app-row-header'>
        <Navbar />
      </div>
      <div className='app-row-body'>
        <Switch location={location}>
          <Route exact path='/' component={PageHome} />
          {projects.map(({ path, component }) =>
            <Route key={path} exact path={`/${path}`} component={component} />
          )}
        </Switch>
      </div>
    </div>
  )
}

const AppWrapper = () =>
  <Router>
    <App />
  </Router>

export default AppWrapper
