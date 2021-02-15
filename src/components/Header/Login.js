import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { isUserLoggedIn, signIn } from '../../Redux/Actions/Authaction';
import { Link } from 'react-router-dom'






const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);







  const handleLogin = (e) => {
    e.preventDefault();

    if (email == "") {
      alert("email required");
      return;
    }
    if (password == "") {
      alert("paas required");
      return;
    }

    dispatch(signIn({ email, password }));



  }

  if (auth.authenticated) {
    return <Redirect to="/" />
  }

  return (
    <>

      <div className="row-fluid center">
        <div className="col-lg-4 col-md-6 col-12 mx-auto">
          <div className="form glass">
            <center>
              <form onSubmit={handleLogin}>
                <h5 className="my-5"><u>LogIn To aMessenger</u></h5>
                <input type="text" className="input_form mt-5" placeholder="Email*" required value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" className="input_form mt-5" placeholder="Password*" required value={password} onChange={e => setPassword(e.target.value)} />
                <button className="btn btn-block btn-danger mt-5" type="submit">Login</button>
                <h5 className="mt-5">New Here ? <Link to="/register" className="link mt-5">Register</Link></h5>
              </form>
            </center>
          </div>
        </div>
      </div>
    </>
  )

}


export default Login


