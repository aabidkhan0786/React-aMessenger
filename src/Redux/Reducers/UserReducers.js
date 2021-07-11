const initialState = {
    users :[],
    conversations:[]
}

export default (state=initialState,action)=>{
    
    switch(action.type){
        case 'USER_REQUEST':
            break;
        case 'USER_SUCCESS':
            state = {
                ...state,
                users: action.payload.users
            }
            break;
        case 'MESSAGE_SENT_SUCCESS':    
            state = {
                ...state,
                conversations : action.payload.conversations
            }
            break;
        default: console.log(state)
    }

    return state;
}