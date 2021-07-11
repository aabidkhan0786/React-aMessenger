import React, { useState } from 'react'
import { signup } from '../../Redux/Actions/Authaction';
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import { Link } from 'react-router-dom'

const Register = () => {

  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  console.log(auth.loading);

  const handleRegister = e => {
    e.preventDefault();
    if(!fname || !lname || !email || !password){
      alert("Please add all fields!")
      return
    }
    if(password.length <= 5){
      alert("Passowrd Should be 6 digits or more!")
      return
    }

    const user = {
      fname, lname, email, password
    }
    dispatch(signup(user));
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
              <form onSubmit={handleRegister}>
                <h5 className="my-5"><u>Regsiter To aMessenger</u></h5>
                <input type="text" className="input_form mt-3 text-capitalize" placeholder="First Name*"  value={fname} onChange={e => setFname(e.target.value)} />
                <input type="text" className="input_form mt-4 text-capitalize" placeholder="Last Name*"  value={lname} onChange={e => setLname(e.target.value)} />
                <input type="text" className="input_form mt-4" placeholder="Email*"  value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" className="input_form mt-4" placeholder="Password*"  value={password} onChange={e => setPassword(e.target.value)} />
                {
                  auth.loading ?
                    <>
                      <button className="btn btn-block btn-danger mt-4" type="submit">
                        <div class="d-flex align-items-center">
                          <strong>Signing Up...</strong>
                          <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                        </div>
                      </button>
                    </>
                    :
                    <button className="btn btn-block btn-danger mt-4" type="submit">Sign Up</button>
                }
                <h5 className="mt-4">Already Registered ? <Link to="/login" className="link mt-5">LogIn</Link></h5>
              </form>
            </center>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
