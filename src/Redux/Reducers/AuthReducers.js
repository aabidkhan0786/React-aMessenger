
const initialState = {
    firstName :"",
    lastName :"",
    email :"",
    authenticated:false,
    authenticated:false,
    error:null
}

export default  (state=initialState,action)=>{

    console.log(action);

    switch(action.type){
        case "LOGIN_REQUEST":
            state={
                ...state,
                authenticating:true,
                loading:true
            }
            break;
        case "LOGIN_SUCCESS":
            state={
                ...state,
                ...action.payload.user,
                authenticating:false,
                authenticated:true,
                loading:false
            }
            break;
        case "LOGIN_FAIL":
            state={
                ...state,
                ...action.payload.error,
                authenticating:false,
                authenticated:false,
                loading:false
            }
            break;    
        case "USER_LOGOUT_REQUEST":
            break;
        case 'USER_LOGOUT_SUCCESS':
            state={
                ...initialState
            }
            break;

        case 'USER_LOGOUT_FAIL':
            state={
                ...state,
                error : action.payload.error
            }
            break;
    }
    return state;

}