import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { NavLink,Link } from 'react-router-dom'
import { userLogOut } from '../../Redux/Actions/Authaction'
import "../Header/style.css"
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const Navbar = () => {

  const auth = useSelector(state=>state.auth)
  const dispatch = useDispatch();



    return (
        <>

            <nav className="navbar navbar-expand-lg menu container-fluid sticky-top"   style={{backgroundColor : "black"}} >
                                 
                  <p className="neon">aMessenger</p>
                       {
                        auth.authenticated ?
                        <>      
                            <NavLink className="nav-link ml-auto logout" to="#" onClick={e=>dispatch(userLogOut(auth.uid))}>LogOut <PowerSettingsNewIcon/></NavLink>
                        </> :null
                      }
                                      
            </nav>


        </>
    )
}

export default Navbar
