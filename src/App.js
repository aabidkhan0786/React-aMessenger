import React, { useEffect } from 'react'
import Navbar from './components/Header/Navbar'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './components/Header/Home'
import Login from './components/Header/Login'
import Register from './components/Header/Register'
import PrivateRoute from "../src/components/PrivateRoute"
import { useDispatch, useSelector } from "react-redux"
import { isUserLoggedIn } from './Redux/Actions/Authaction';


const App = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isUserLoggedIn())
    }
  }, [])

  return (
    <>
      <Navbar />
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Redirect to="/" />
      </Switch>

    </>
  )
}

export default App
