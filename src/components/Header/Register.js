import React, { useState } from 'react'
import { signup } from '../../Redux/Actions/Authaction';
import {useDispatch,useSelector} from "react-redux"
import {Redirect} from "react-router-dom"

const Register = () => {

    const [fname,setFname] = useState();
    const [lname,setLname] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const dispatch = useDispatch();
    const auth = useSelector(state=> state.auth)

    const handleRegister=e=>{
        e.preventDefault();
        const user ={
            fname,lname,email,password
        }
        dispatch(signup(user));
    }


    if(auth.authenticated){
      return <Redirect to="/"/>
    }

    return (
        <>
             
             <form onSubmit={handleRegister}>
  <div class="row">
    <div class="col">
      <input type="text" class="form-control" placeholder="First name" value={fname} onChange={e=> setFname(e.target.value)}/>
    </div>
    <div class="col">
      <input type="text" class="form-control" placeholder="Last name"  value={lname} onChange={e=> setLname(e.target.value)}/>
    </div>
  </div>

  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={e=> setEmail(e.target.value)}/>
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" value={password} onChange={e=> setPassword(e.target.value)}/>
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
</form>
        </>
    )
}

export default Register
