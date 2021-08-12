import React from 'react'
import './App.css'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import Home from './layouts/Home/Home.js'
import Login from './layouts/Login/Login.js'

function App() {
  return (
    <div className='App-root'>
      <Router>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route path='/' component={Home} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
