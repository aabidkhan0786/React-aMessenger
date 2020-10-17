import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux";
import { Redirect } from 'react-router-dom';
import {isUserLoggedIn, signIn} from '../../Redux/Actions/Authaction';
import "./login.css"


import { signup } from '../../Redux/Actions/Authaction';




const Login = () => {
  
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
 
  console.log(auth.t);





  const handleLogin=(e)=>{
    e.preventDefault();

    if(email==""){
      alert("email required");
      return;
    }
    if(password==""){
      alert("paas required");
      return;
    }

    dispatch(signIn({email,password}));



  }

  if(auth.authenticated){
    return <Redirect to="/"/>
  }

    return (
        <>
<div className="body1 mt-4">



                <div class="main">  	
		<input type="checkbox" id="chk" aria-hidden="true"/>

                <Register/>

			<div class="login">
				<form  onSubmit={handleLogin}>
					<label className="label1" for="chk" aria-hidden="true">Login</label>
					<input className="input1" type="email" name="email" placeholder="Email" required="" value={email} onChange={e=>setEmail(e.target.value)}/>
					<input className="input1" type="password" name="pswd" placeholder="Password" required="" value={password} onChange={e=>setPassword(e.target.value)}/>
					<button className="button1" type="submit">Login</button>
				</form>
			</div>
	</div>
  </div>
        </>
    )
    
}

const Register = ()=>{
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

	<div class="signup">
				<form onSubmit={handleRegister}>
					<label className="label1" for="chk" aria-hidden="true">Sign up</label>
					<input className="input1" type="text" name="txt" placeholder="First Name" required="" value={fname} onChange={e=> setFname(e.target.value)}/>
					<input className="input1" type="text" name="txtl" placeholder="Last Name" required="" value={lname} onChange={e=> setLname(e.target.value)}/>
          <input className="input1" type="email" name="email" placeholder="Email" required="" value={email} onChange={e=> setEmail(e.target.value)}/>
					<input className="input1" type="password" name="pswd" placeholder="Password" required="" value={password} onChange={e=> setPassword(e.target.value)}/>
				
					<button className="button1" type="submit">Sign up</button>
				</form>
			</div>
      </>
  )
}


export default Login


