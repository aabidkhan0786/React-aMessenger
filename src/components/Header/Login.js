import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { isUserLoggedIn, signIn } from '../../Redux/Actions/Authaction';
import { Link } from 'react-router-dom'


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  console.log(auth.loading);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please add your proper credentials!")
      return
    }
    // setLoading(true)
    dispatch(signIn({ email, password }));
  }

  console.log(auth.authenticated);
  if (auth.authenticated) {
    return <Redirect to="/" />
  }

  return (
    <>

      <div className="row-fluid">
        <div className="col-lg-3 col-md-6 col-12 mx-auto">
          <div className="form glass">
            <center>
              <form onSubmit={handleLogin}>
                <h5 className="my-5"><u>LogIn To aMessenger</u></h5>
                <input type="text" className="input_form mt-5" placeholder="Email*" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" className="input_form mt-5" placeholder="Password*" value={password} onChange={e => setPassword(e.target.value)} />
                {
                  auth.loading ?
                    <>
                      <button className="btn btn-block btn-danger mt-5" type="submit">
                        <div class="d-flex align-items-center">
                          <strong>Signing In...</strong>
                          <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                        </div>

                      </button>
                    </>
                    :
                    <button className="btn btn-block btn-danger mt-5" type="submit">Sign In</button>
                }
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


