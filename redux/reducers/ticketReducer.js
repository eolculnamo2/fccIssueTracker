export const SETTICKETDATA = 'ticketReducer/SETTICKETDATA'
export const GET_TICKET_DATA = 'ticketReducer/GET_TICKET_DATA'
export const UPDATE_TICKET_STATE = 'ticketReducer/UPDATE_TICKET_STATE'


let initialState = {
    ticketData: [],
    ticketStatus: []
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
        case UPDATE_TICKET_STATE:
        return {
            ...state,
            ticketStatus: action.payload
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
    return dispatch => {
    fetch('/api/issues/apitestproject')
    .then( res => res.json())
    .then( data => {     
            let x = data.sort((a,b) => {
                return new Date(b['updated_on']) - new Date(a['updated_on'])
            })
            dispatch({type: GET_TICKET_DATA, payload: data})
        })    
    }
}

export const updateTicketState = (status,index) => {
    return (dispatch, getState) => {
      let st = getState().ticketReducer
      let data = st.ticketData.map((x,i) => {
          if (status !== undefined && index !== undefined) {
            return i === index ? status : true
          }
          else {
              return true
          }
      })
      dispatch({type: UPDATE_TICKET_STATE, payload: data})
    }
}
