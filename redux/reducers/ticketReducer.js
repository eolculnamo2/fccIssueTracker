export const SETTICKETDATA = 'ticketReducer/SETTICKETDATA'
export const GET_TICKET_DATA = 'ticketReducer/GET_TICKET_DATA'

let initialState = {
    ticketData: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case SETTICKETDATA:
        return {
            ...state,
            ticketData: action.payload
        }
        case GET_TICKET_DATA:
        return {
            ...state,
            ticketData: action.payload
        }
        default:
        return state;
    }
};


export const setTicketData = data => {
   return dispatch => {
        dispatch({type: SETTICKETDATA, payload: data})
   }
}

export const getTicketData = () => {
    // returning dispatch is part of thunk
    return dispatch => {
    fetch('/api/issues/apitestproject')
    .then( res => res.json())
    .then( data => {     
            dispatch({type: GET_TICKET_DATA, payload: data})
        })    
    }
}
