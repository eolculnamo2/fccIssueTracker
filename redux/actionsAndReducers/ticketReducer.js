export const SETTICKETDATA = 'ticketReducer/SETTICKETDATA'
import store from '../store'

let initialState = {
    ticketData: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case "SETTICKETDATA":
        return {
            ...state,
            ticketData: action.payload
        }
        default:
        return state;
    }
};

//action
export const setTicketData = () => {
    store.dispatch({type: "SETTICKETDATA", payload: "data"})
}
