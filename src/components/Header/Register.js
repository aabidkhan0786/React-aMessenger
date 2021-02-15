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

  const handleRegister = e => {
    e.preventDefault();
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
                <input type="text" className="input_form mt-3" placeholder="First Name*" required value={fname} onChange={e => setFname(e.target.value)} />
                <input type="text" className="input_form mt-4" placeholder="Last Name*" required value={lname} onChange={e => setLname(e.target.value)} />
                <input type="text" className="input_form mt-4" placeholder="Email*" required value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" className="input_form mt-4" placeholder="Password*" required value={password} onChange={e => setPassword(e.target.value)} />
                <button className="btn btn-block btn-danger mt-4" type="submit">Sign Up</button>
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
