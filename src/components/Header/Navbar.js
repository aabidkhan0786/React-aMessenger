import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import { userLogOut } from '../../Redux/Actions/Authaction'
import "../Header/styles.css"
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const Navbar = () => {

    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch();



    return (
        <>
            <div className="row-fluid">
                <div className="">
                    <nav className="navbar border-50 glass shadow-lg  rounded">
                        <p className="neon"><u>aMessenger</u></p>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Navbar
