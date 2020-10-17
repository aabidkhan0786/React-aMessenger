import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from "react-redux"
import { getConversation, getUsers, passMessage } from '../../Redux/Actions/Useraction';
import Avatar from 'react-avatar';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import SendIcon from '@material-ui/icons/Send';
import "../Header/style.css"
import ChatIcon from '@material-ui/icons/Chat';


const User = props =>{
    const {user,onClick} =props;
    const name = `${user.firstName} ${user.lastName}`
    console.log(name)
    return(
        <>
            <div className="carousel" onClick={()=>onClick(user)}>{user.isOnline ?  <span className="float-right online">  </span>:<span className="float-right  offline">  </span>}
                <Avatar size="40" round={true} name={name}/> {name}    
            </div>
    </>
    )
}


const Home = () => {

    const dispatch = useDispatch();
    const auth = useSelector(state=>state.auth)
    const user = useSelector(state=>state.user)
    const [startChat,setStartChat] = useState(false);
    const [userChat,setUserChat] = useState('');
    const [message,setMessage] = useState("");
    const [chatUser,setChatUSer] = useState(null);

    useEffect(()=>{
        dispatch(getUsers(auth.uid));
    },[])


    const chat = user =>{
        const name = `${user.firstName} ${user.lastName}`
        setStartChat(true);
        setUserChat(name)
        setChatUSer(user.uid)

        dispatch(getConversation({uid_1: auth.uid, uid_2: user.uid}))

    }

    const sendMessage=()=>{

        const msgobj = {
            message,
            user_uid_1 : auth.uid,
            user_uid_2 : chatUser,
        }
        console.log(msgobj);

        if(message != ""){
            dispatch(passMessage(msgobj));
            setMessage("");
        }
    }

    const options = {
        // margin: 30,
        responsiveClass: true,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 2,
            },
            400: {
                items: 2,
            },
            600: {
                items: 2,
            },
            700: {
                items: 2,
            },
            1000: {
                items: 2,
            }
        },
      };

    return (
        <>

<section className="row ">
        <div className="col-md-6 col-sm-12 mx-auto my-5 border ">
            <div className=" border rounded text-center mt-5 chat_name pt-2 text-capitalize">
                {auth.authenticated ? <> hello, {`${auth.firstName} ${auth.lastName}`}</>:null}
            </div>   


            <div className="text-capitalize">

                {   
                    user.users.length > 0 ?
                    <OwlCarousel className="slider-items owl-carousel "  {...options}>
                    {user.users.map(user=>
                    <>
                        
                            <div class="card" style={{}}>
                                <div class="card-body bg-info">
                                    <User user={user} key={user.uid} onClick={chat} />
                                </div>
                            </div>
                                    
                    </>
                    )} </OwlCarousel> : null
                    
                }   
                
                </div>

    
    { startChat ? <div id="head" className="mt-3 text-capitalize px-3 py-2"> <Avatar size="50" round={true} name={userChat} className="mr-3"/>{userChat} 
    {user.isOnline ?  <span className="float-right my-3 online">  </span>:<span className="float-right my-3 offline">  </span>}
     </div> :<> <h1 className="my-5 maker  ">Select User From Above to chat <ChatIcon/></h1> <br/>
        <h2 className="my-5 text-center maker ">Developed By:<b style={{color:'black'}}><u> Abdul Aabid Khan</u></b></h2></> }
   
    <div id="body" className="mb-0" >
    {
        startChat ?
       <div className="bg-info w-100 h-100">
        {user.conversations.map(con=>
            <div  style={{textAlign : con.user_uid_1 == auth.uid ? 'right':'left' }}>
                <p className="px-2" >{con.message}</p>
            </div>
        )} </div>:""
    }

    <div id="btm">
    {
              startChat ? <>
              <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Write Your Message...." aria-label="Recipient's username" aria-describedby="button-addon2"
                        value={message} onChange={(e) => setMessage(e.target.value)}/>
              <div class="input-group-append">
                <button class="btn btn-info" type="button" id="button-addon2"><SendIcon onClick={sendMessage} /></button>
              </div>
            </div>
        </>:null}
    </div>
    
   


</div>
</div>

</section>

        </>
    )
}

export default Home
