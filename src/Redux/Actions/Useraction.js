import { firestore } from 'firebase'

export const getUsers = (uid) =>{
    return async (dispatch)=>{
        dispatch({type: 'USER_REQUEST'})

        const db = firestore();
        db.collection('users')

        .onSnapshot((querySnapshot)=>{
            const users=[];
            querySnapshot.forEach(doc=>{
                if(doc.data().uid != uid){
                    users.push(doc.data());
                }
                
            })
            // console.log(users);
            dispatch({type: 'USER_SUCCESS',
            payload: {users}
        })
        })

    }
}



export const passMessage = (msgobj)=>{
    return async dispatch =>{
        const db = firestore();
        db.collection("conversations")
        .add({
            ...msgobj,
            createdAt: new Date(),
            isView : false
        })
        .then((data)=>{
            console.log(data);

        })
        .catch(error=>{
            console.log(error);
            alert(error);
        })
    }

}


export const getConversation = (user)=>{
    return async dispatch=>{
        const db =  firestore();
        db.collection('conversations')
        .where('user_uid_1','in',[user.uid_1,user.uid_2])
        .orderBy('createdAt', 'asc')
        .onSnapshot(querySnapshot=>{
            const conversations = [];
            querySnapshot.forEach(doc=>{
                console.log(doc.data())

                if(
                    (doc.data().user_uid_1 == user.uid_1 && doc.data().user_uid_2 == user.uid_2)
                    || 
                    (doc.data().user_uid_1 == user.uid_2 && doc.data().user_uid_2 == user.uid_1)
                ){
                    conversations.push(doc.data())
                }


                // if(conversations.length > 0 ){
                //     dispatch({
                //         type:"MESSAGE_SENT_SUCCESS",
                //         payload : {conversations}
                //     })
                // }else{
                //     dispatch({
                //         type:"MESSAGE_SENT_FAILURE",
                //         payload : {conversations}
                //     })
                // }
                
            })
            dispatch({
                type: "MESSAGE_SENT_SUCCESS",
                payload: { conversations }
            })
            console.log(conversations)
        })
    }
}