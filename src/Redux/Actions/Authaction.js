import {auth, firestore} from "firebase"

export const signup = (user)=>{
    return async (dispatch) => {
        const db = firestore();
        dispatch({
            type: "LOGIN_REQUEST",
            
        })
        auth()
        .createUserWithEmailAndPassword(user.email,user.password)
        .then(data=>{
            console.log(data);
            const currUser = auth().currentUser;
            const name = `${user.fname} ${user.lname}`
            currUser.updateProfile({
               displayName : name
            })
            .then(()=>{
                db.collection("users")
                .doc(data.user.uid)
                .set({
                    firstName : user.fname,
                    lastName : user.lname,
                    uid : data.user.uid,
                    createdAt :new Date(),
                    isOnline : true
                }).then(()=>{
                    const loggedIn = {
                        firstName : user.fname,
                        lastName : user.lname,
                        uid : data.user.uid,
                        email : user.email
                    }
                    localStorage.setItem('user',JSON.stringify(loggedIn));
                    console.log("successfull");
                    dispatch({
                        type: "LOGIN_SUCCESS",
                        payload: {user:loggedIn}
                    })
                })
                    .catch(error=>{
                        console.log(error);
                        dispatch({
                            type: "LOGIN_FAIL",
                            payload: {error}
                        })
                    })
                
            })
        })
        .catch(error=>{
            console.log(error);
            alert(error);
        })
    }
}


export const signIn=(user)=>{
    return async dispatch =>{
        dispatch({
            type:'LOGIN_REQUEST'
        });


        

        auth()
        .signInWithEmailAndPassword(user.email,user.password)
        .then((data)=>{
            console.log(data);


            const db = firestore();
            db.collection('users')
            .doc(data.user.uid)
            .update({
                isOnline:true
            })
            .then(()=>{
                const name = data.user.displayName.split(" ");
                const firstName = name[0];
                const lastName = name[1];
                const loggedIn = {
                    firstName ,
                    lastName ,
                    uid : data.user.uid,
                    email : data.user.email
                }
                localStorage.setItem('user',JSON.stringify(loggedIn));
                console.log("successfull");
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: {user:loggedIn}
                })
            })
            .catch(error=>{
                alert(error)

            })


        })
        .catch(error=>{
            alert(error);
            dispatch({
                type:'LOGIN_FAIL',
                payload:{error}
            })
        })
    }
}


export const isUserLoggedIn = ()=>{
    return async dispatch=>{
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        if(user){
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: {user}
            })
        }else{
            dispatch({
                type:'LOGIN_FAIL',
                payload:{error:"Log In Again Please"}
            })
        }
    }
}


export const userLogOut = (uid)=>{
    return async dispatch=>{
        dispatch({
            type:"USER_LOGOUT_REQUEST",
        })

        const db = firestore();
        db.collection('users')
        .doc(uid)
        .update({
            isOnline:false
        })
        .then(()=>{
            auth()
            .signOut()
            .then(()=>{
                localStorage.clear();
                dispatch({type:"USER_LOGOUT_SUCCESS"})
            })
            .catch(error=>{
                console.log(error);
                dispatch({
                    type:"USER_LOGOUT_FAIL",
                    payload: {error}
            })
            })
        })

        .catch(error=>{
            console.log(error);
            alert(error);
        })


        
    }
}

