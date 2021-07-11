import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { getConversation, getUsers, passMessage } from '../../Redux/Actions/Useraction';
import Avatar from 'react-avatar';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import "../Header/styles.css"
import ChatIcon from '@material-ui/icons/Chat';
import { NavLink, Link } from 'react-router-dom'
import { userLogOut } from '../../Redux/Actions/Authaction'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import ScrollableFeed from 'react-scrollable-feed'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ReactTooltip from "react-tooltip";


const User = props => {
    const { user, onClick } = props;
    const name = `${user.firstName} ${user.lastName}`
    console.log(name)
    return (
        <>
            <div style={{ cursor: 'pointer' }} onClick={() => onClick(user)}>
                {/* <div className="d-flex flex-row">
                    <div className="">
                        <Avatar size="30" round={true} name={name} />
                        <p className="ml-2 text-capitalize">{name}</p>
                    </div>
                    {user.isOnline ? <span className="float-right online">  </span> : <span className="float-right  offline"></span>}
                </div> */}
                <div className="d-flex flex-row m-3 user_name ">
                    <Avatar size="30" round={true} name={name} />
                    <p className="ml-2 text-capitalize h5">{name}</p>
                    {user.isOnline ? <span className="float-right online ml-auto mt-2">  </span> : <span className="float-right ml-auto  offline mt-2"></span>}
                </div>
            </div>
        </>
    )
}


const Home = () => {

    const [sidebar, setSidebar] = useState(false);
    const [icon, setIcon] = useState(false);
    const [chosenEmoji, setChosenEmoji] = useState(null);

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)
    const user = useSelector(state => state.user)
    const [startChat, setStartChat] = useState(false);
    const [userChat, setUserChat] = useState('');
    const [message, setMessage] = useState("");
    const [chatUser, setChatUSer] = useState(null);
    const [emoji, setEmoji] = useState(false);
    const [search, setSearch] = useState('');


    useEffect(() => {
        dispatch(getUsers(auth.uid));
    }, [])

    const showSidebar = () => {
        setSidebar(!sidebar);
        setIcon(!icon);
    }

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

    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        setMessage(chosenEmoji && chosenEmoji.emoji)
    };

    const filterUser = user.users.filter(user=>(
        user.firstName.toLowerCase().includes(search.toLowerCase())
    ))
    return (
        <>
            <div className="row-fluid">
                <div className=" col-12 mx-auto main_content  border-50 glass shadow-lg  rounded">
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
                        <div className="user_list d-flex flex-column border-50 glass shadow-lg rounded ">
                            <div className="">
                                <HighlightOffIcon style={{ cursor: "pointer" }} onClick={showSidebar} className="float-right ml-auto" />
                                <h4 className="text-center "><u>List Of User</u></h4>
                            </div>                              
                            <center>
                                <input type="text" placeholder="Find friends" className="input_form" onChange={e=>setSearch(e.target.value)} />
                            </center>
                            <div className="min_height" >
                                {
                                    user.users.length > 0 ?
                                        <>
                                            {filterUser.map(user =>
                                                <User user={user} key={user.uid} onClick={chat} />
                                            )}
                                        </>
                                        : null
                                }
                            </div>
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
                                {
                                    !sidebar &&

                                    <>
                                        <div className="div_3 my-5 ">
                                            <center>
                                                <h4 className="welcome_text">Select User From Menu Icon to chat <ChatIcon />
                                                    <br /><br />
                                                    App is Developed By:
                                                    <a href="https://aabidkhan0786.github.io/aPortfolio.github.io/" target="_blank" data-tip="Click to visit portfolio" data-place="right">
                                                        <b style={{ color: 'black' }}><u> Abdul Aabid Khan</u></b>
                                                    </a><br />
                                                    <div className="socail_icons m-4">
                                                        Also find me on : <br />
                                                        <a data-tip="Gmail" data-type="error" href="mailto:khanaab786@gmail.com" target="_blank">
                                                            <i style={{ color: 'black' }} class="far fa-envelope mt-1 h2 p-2 border-50 glass mr-2 shadow-lg  rounded"></i>

                                                        </a>
                                                        <a data-tip="Github" href="https://github.com/aabidkhan0786" target="_blank">
                                                            <i style={{ color: 'black' }} class="fab fa-github-square h2 p-2 border-50 glass mr-2 shadow-lg  rounded"></i>
                                                        </a>
                                                        <a data-tip="LinkedIn" data-type="info" href="https://www.linkedin.com/in/abdul-aabid-khan-4185851b0/" target="_blank">

                                                            <i style={{ color: 'black' }} class="fab fa-linkedin p-2 h2 border-50 glass mr-2 shadow-lg  rounded"></i>
                                                        </a>
                                                        <a data-tip="Instagram" data-type="warning" href="https://www.instagram.com/_khan_aabid_/" target="_blank">

                                                            <i style={{ color: 'black' }} class="fab fa-instagram p-2 h2 border-50 glass mr-2 shadow-lg  rounded"></i>
                                                        </a>
                                                    </div>
                                                </h4>
                                            </center>
                                        </div>
                                    </>
                                }
                            </>
                        }

                        {
                            startChat ?
                                <div className="cons">
                                    <ScrollableFeed>
                                        {
                                            !sidebar &&
                                            <>
                                                {user.conversations.map(con =>
                                                    <div className="m-3 " style={{ textAlign: con.user_uid_1 == auth.uid ? 'right' : 'left' }}>
                                                        <span className="px-3 py-1 border_msg h6 border-50 glass shadow-lg rounded-pill" >{con.message}</span>
                                                    </div>
                                                )}
                                            </>
                                        }
                                        {
                                            emoji &&
                                            <Picker
                                                onEmojiClick={onEmojiClick}
                                                disableAutoFocus={true}
                                                skinTone={SKIN_TONE_MEDIUM_DARK}
                                                groupNames={{ smileys_people: "PEOPLE" }}
                                                native
                                            />
                                        }
                                    </ScrollableFeed>
                                </div>
                                : ""
                        }
                        {
                            startChat ? <>
                            {
                                !sidebar &&
                                <>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <button className="btn_send" onClick={() => setEmoji(!emoji)} type="buton">
                                                {emoji ? <HighlightOffIcon /> : <InsertEmoticonIcon />}
                                            </button>
                                        </span>
                                    </div>
                                    <textarea type="text" className="form-control" placeholder={`Text Message  #${userChat}`} value={message} onChange={(e) => setMessage(e.target.value)} />
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <button className="btn_send" onClick={sendMessage} type="buton">
                                                Send <i className="fas fa-angle-double-up pl-2"></i>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                                </>
                            }
                            </>
                        : null
                        }
                    </div>
                </div>
            </div>
            <ReactTooltip globalEventOff="click" />
        </>
    )
}

export default Home
