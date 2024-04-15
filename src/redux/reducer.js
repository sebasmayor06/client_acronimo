import { GET_ACRONIMO, POST_ACRONIMO, GET_HISTORIAL } from "./actions";


const initialState = {
    acronicos : [],
    historial: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_ACRONIMO:
            return{
                
            }

        case GET_ACRONIMO:
            
            return{
                ...state,
                acronicos : action.payload
                
            }

        case GET_HISTORIAL:
            return{
                ...state,
                historial: action.payload
            }
            default:
                return { ...state };
            
  };
}
  export default rootReducer;