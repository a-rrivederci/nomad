import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Main views
import Cockpit from './main/cockpit'
import Dash from './main/dash'
import Login from './main/login'

// Stylesheets
import './stylesheets/App.css';
import './stylesheets/cockpit.css';
import './stylesheets/dash.css';
import './stylesheets/login.css';

// The App component renders one of the three provided
// Routes (provided that one matches). Both the /dashboard
// and /cockpit routes will match any pathname that starts
// with /dashboard or /cockpit. The / route will only match
// when the pathname is exactly the string "/"
const App = () => (
  // Main program view
  <div id="main">
    <Switch>
      <Route exact path='/' component={Login}/>
      <Route path='/dashboard' component={Dash}/>
      <Route path='/cockpit' component={Cockpit}/>
    </Switch>
  </div>
)

export default App
