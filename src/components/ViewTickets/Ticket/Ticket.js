import React from 'react'
import { connect } from 'react-redux'
import { setTicketData } from '../../../../redux/actionsAndReducers/ticketReducer'
import '../../../scss/main.scss'

class Ticket extends React.Component {
    componentWillMount() {
         fetch('/api/issues/apitestproject')
        .then( res => {
            return res.json()
        })
        .then( data => {
            alert(JSON.stringify(data,null,3))
            this.props.setTicketData(data)
        }) 
    }
    render() {
        return (
            <div className='ticket-box'>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ticketData: state.ticketReducer.ticketData
    }
} 

const mapDispatchToProps = dispatch =>{
    return {
        setTicketData
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Ticket)