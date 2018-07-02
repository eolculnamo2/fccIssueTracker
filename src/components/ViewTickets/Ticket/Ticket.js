import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getTicketData, updateTicketState } from '../../../../redux/reducers/ticketReducer'
import EditTicket from './EditTicket/EditTicket'
import StaticTicket from './StaticTicket/StaticTicket'

class Ticket extends React.Component {
    constructor() {
        super()
        this.changeStatus = this.changeStatus.bind(this)
        this.updateTicket = this.updateTicket.bind(this)
    }

    updateTicket(edit,index) {
        this.props.updateTicketState(edit,index)
    }

    changeStatus(x, target, newValue) {
        x.target = target
        x.newValue = newValue

        fetch('/api/issues/change-ticket-status',{
            method: "POST",
            body: JSON.stringify(x),
            headers: { "Content-Type": "application/json" }
          })
        .then( () => {
            this.props.getTicketData()
        })
    }
    
    render() {
        return(
            <div className='ticket-box'>
                {this.props.ticketData.map((x,i)=>{
                    if (this.props.ticketStatus[i]) {
                        return (
                            <StaticTicket data ={x}
                                          changeStatus={this.changeStatus}
                                          updateTicket={this.updateTicket}
                                          index={i}
                                          status={true}/>
                        )       
                    }
                    else {
                        return (
                            <EditTicket data ={x}
                                        changeStatus={this.changeStatus}
                                        updateTicket={this.updateTicket}
                                        index={i}
                                        status={false}/>
                        ) 
                    }
                })}
            </div>
        )
    }
}
const mapStateToProps = state => ({
        ticketData: state.ticketReducer.ticketData,
        ticketStatus: state.ticketReducer.ticketStatus
    })

const mapDispatchToProps = dispatch =>{
    return bindActionCreators(
        {
            getTicketData,
            updateTicketState
        },
        dispatch
    )}

export default connect(mapStateToProps, mapDispatchToProps)(Ticket)