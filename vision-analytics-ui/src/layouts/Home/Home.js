import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import NavBar from './../../components/NavBar/NavBar'
import DashboardLayout from './../Dashboard/DashboardLayout'
import CamerasLayout from './../Cameras/CamerasLayout'
import NoPageFound from './../../components/NoPageFound/NoPageFound.js'

function Home(props) {
  console.log(props.match)
  return (
    <div className='Home-page'>
      <NavBar>
        <div>
          <Route exact path='/no' component={NoPageFound} />
          <Route exact path='/cameras' component={CamerasLayout} />
          <Route exact path='/' component={DashboardLayout} />
        </div>
        <div />
      </NavBar>
    </div>
  )
}

export default Home