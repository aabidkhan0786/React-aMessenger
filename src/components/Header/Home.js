import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { getConversation, getUsers, passMessage } from '../../Redux/Actions/Useraction';
import Avatar from 'react-avatar';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import SendIcon from '@material-ui/icons/Send';
import "../Header/styles.css"
import ChatIcon from '@material-ui/icons/Chat';

import { NavLink, Link } from 'react-router-dom'
import { userLogOut } from '../../Redux/Actions/Authaction'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import ScrollableFeed from 'react-scrollable-feed'


const User = props => {
    const { user, onClick } = props;
    const name = `${user.firstName} ${user.lastName}`
    console.log(name)
    return (
        <>
            <div style={{ cursor: 'pointer' }} onClick={() => onClick(user)}>

                <div className="sub_nav mt-2">
                    <div className="div_1">
                        <Avatar size="30" round={true} name={name} />
                        <p className="ml-2 text-capitalize">{name}</p>
                    </div>
                    {user.isOnline ? <span className="float-right online">  </span> : <span className="float-right  offline"></span>}
                </div>
            </div>
        </>
    )
}


const Home = () => {

    const [sidebar, setSidebar] = useState(false);
    const [icon, setIcon] = useState(false);

    const showSidebar = () => {
        setSidebar(!sidebar);
        setIcon(!icon);
    }



    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
    const user = useSelector(state => state.user)
    const [startChat, setStartChat] = useState(false);
    const [userChat, setUserChat] = useState('');
    const [message, setMessage] = useState("");
    const [chatUser, setChatUSer] = useState(null);

    useEffect(() => {
        dispatch(getUsers(auth.uid));
    }, [])


    const chat = user => {
        const name = `${user.firstName} ${user.lastName}`
        setStartChat(true);
        setUserChat(name)
        setChatUSer(user.uid)

        dispatch(getConversation({ uid_1: auth.uid, uid_2: user.uid }))

    }

    const sendMessage = () => {

        const msgobj = {
            message,
            user_uid_1: auth.uid,
            user_uid_2: chatUser,
        }
        console.log(msgobj);

        if (message != "") {
            dispatch(passMessage(msgobj));
            setMessage("");
        }
    }



    console.log(sidebar);

    return (



        <>
            <div className="row-fluid">
                <div className=" col-12 mx-auto main_content glass">
                    <div className="sub_nav">

                        <div className="pt-3 div_1">
                            {icon ? <i class="fas fa-times pt-1" onClick={showSidebar} ></i> :

                                <i className="fas fa-bars pt-1 " onClick={showSidebar}></i>
                            }
                            <h5 className="ml-2 text-capitalize">
                                {auth.authenticated ? <>
                                    <span>
                                        Hello, {`${auth.firstName} ${auth.lastName}`}
                                    </span>
                                </> : null}
                            </h5>
                        </div>
                        {auth.authenticated ?
                            <>
                                <NavLink className="nav-link logout" to="#" onClick={e => dispatch(userLogOut(auth.uid))}><span className="log_btn">LogOut</span> <PowerSettingsNewIcon /></NavLink>
                            </> : null
                        }
                    </div>

                    <div className={sidebar ? "show" : "hide"}>
                        <div className="div_2">
                            <div className="short_div my-2">
                                <h4 className="ml-3 "><u>List Of Users</u></h4>
                                <i class="fas fa-times pt-1" onClick={showSidebar} ></i>
                            </div>
                            {
                                user.users.length > 0 ?
                                    <>
                                        {user.users.map(user =>

                                            <User user={user} key={user.uid} onClick={chat} />

                                        )}
                                    </>
                                    : null
                            }
                        </div>

                    </div>

                    <div className="chat_screen">
                        {startChat ?
                            <div className="sub_nav mt-2">
                                <div className="div_1">
                                    <Avatar size="50" round={true} name={userChat} className="mr-3" />
                                    <p className="ml-2 pt-3 text-capitalize text-center">{userChat}</p>
                                </div>
                                {user.isOnline ? <span className="float-right my-3 online">  </span> :
                                    <span className="float-right my-3 offline">  </span>}
                            </div> :
                            <>
                                <div className="div_3 my-5">
                                    <center>
                                        <h4 className="welcome_text">Select User From Menu Icon to chat <ChatIcon />
                                            <br /><br />
                                            App is Developed By:<b style={{ color: 'black' }}><u> Abdul Aabid Khan</u></b>
                                        </h4>
                                    </center>
                                </div>

                            </>

                        }

                        {
                            startChat ?
                                <div className="cons"   >
                                    <ScrollableFeed>
                                        {user.conversations.map(con =>
                                            <div style={{ textAlign: con.user_uid_1 == auth.uid ? 'right' : 'left' }}>
                                                <p className="px-2" >{con.message}</p>

                                            </div>
                                        )}
                                    </ScrollableFeed>
                                </div>
                                : ""
                        }

                        {
                            startChat ? <>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">$</span>
                                    </div>
                                    <input type="text" className="form-control" placeholder={`Text Message  #${userChat}`} value={message} onChange={(e) => setMessage(e.target.value)} />
                                    <div className="input-group-append">
                                        <span className="input-group-text" >
                                            <button className="btn_send" onClick={sendMessage} type="buton">
                                                Send <i className="fas fa-angle-double-up pl-2"></i>
                                            </button>
                                        </span>

                                    </div>
                                </div>
                            </>
                                : null}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
