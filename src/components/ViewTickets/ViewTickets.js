import React from 'react'
import Ticket from './Ticket/Ticket'
import '../../scss/main.scss'

class ViewTickets extends React.Component {
    render() {
        return (
            <div className = "view-tickets-box">
                <Ticket />
            </div>
        )
    }
}

export default ViewTickets