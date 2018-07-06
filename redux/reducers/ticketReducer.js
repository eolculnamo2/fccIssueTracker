export const SETTICKETDATA = 'ticketReducer/SETTICKETDATA'
export const GET_TICKET_DATA = 'ticketReducer/GET_TICKET_DATA'
export const UPDATE_TICKET_STATE = 'ticketReducer/UPDATE_TICKET_STATE'
export const SET_USER_STATUS = 'ticketReducer/SET_USER_STATUS'


let initialState = {
    ticketData: [],
    projectData: [],
    ticketStatus: [],
    username: null,
    loggedIn: false
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
            ticketData: action.payload,
            projectData: action.payload2,
            username: action.user,
            loggedIn: action.logged
        }
        case UPDATE_TICKET_STATE:
        return {
            ...state,
            ticketStatus: action.payload
        }
        case SET_USER_STATUS:
        return {
            ...state,
            username: action.user,
            loggedIn: action.logged
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
    let x=[]
    let y=[]
    let username = ''
    let loggedIn = false

    return dispatch => {
        fetch('/api/issues/apitestproject')
        .then( res => res.json())
        .then( data => {     
                x = data.sort((a,b) => {
                    return new Date(b['updated_on']) - new Date(a['updated_on'])
                })
            
            fetch('/api/issues/all-projects')
            .then( res => res.json())
            .then( data => {     
                    y = data.sort((a,b) => {
                        return new Date(b['updated_on']) - new Date(a['updated_on'])
                    })

                    fetch('/authenticate/checkLogin',{
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        credentials: "same-origin"
                        })
                    .then( res => res.json())
                    .then( data => {     
                        if (data.name) {
                            username = data.user
                            loggedIn = true
                        }
                    dispatch({type: GET_TICKET_DATA, payload: x, payload2: y, user: username, logged: loggedIn})
                })   
            })   
        }) 
    }
}

export const setUserStatus = (username, loggedIn) => {
    return dispatch => {
        dispatch({type: SET_USER_STATUS, user: username, logged: loggedIn})
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
