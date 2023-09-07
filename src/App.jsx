import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-widgets/styles.css'
import {
  HashRouter as Router,
  Route,
  Switch,
  useLocation
} from 'react-router-dom'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { projects } from './Components/projects'
import PageHome from './Components/PageHome'
import Navbar from './Components/NavBar'
import './App.scss'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// // Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
export const analytics = getAnalytics(firebaseApp)

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
