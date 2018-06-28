export const SETTICKETDATA = 'ticketReducer/SETTICKETDATA'

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
        default:
        return state;
    }
};


export const setTicketData = data => {
   return dispatch =>{
        dispatch({type: SETTICKETDATA, payload: data})
   }
}
