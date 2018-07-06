import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getTicketData, updateTicketState } from '../../../redux/reducers/ticketReducer'
import EditTicket from './EditTicket/EditTicket'
import StaticTicket from './StaticTicket/StaticTicket'

class Ticket extends React.Component {
    constructor() {
        super()
        this.submitChanges = this.submitChanges.bind(this)
        this.changeStatus = this.changeStatus.bind(this)
        this.updateTicket = this.updateTicket.bind(this)
        this.deleteTicket = this.deleteTicket.bind(this)
        this.state = {
            currentUsers: []
        }
    }

    componentWillMount() {
        this.getTeammates()
    }
    getTeammates(){
        let payload = {
            project: this.props.match.params.str
        }

        fetch('/posts/getTeammates',{
            method: "POST",
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" }
          })
        .then( res => res.json())
        .then( data => {
            this.setState({currentUsers: data.users})
        })
    }
    addUser() {
        let payload = {
            user: document.getElementById('newTeammate').value.toLowerCase(),
            project: this.props.match.params.str
        }

        fetch('/posts/newTeammate',{
            method: "POST",
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" }
          })
        .then( res => res.json())
        .then( data => {
            this.props.getTicketData()
            this.getTeammates()
            alert(data.status)
        })
    }

    submitChanges(id,index) {
        let payload = {
            id: id,
            assignedTo: document.getElementById('new-assigned-to').value,
            open: document.getElementById('open').value,
            newStatus: document.getElementById('new-status-text').value
        }

        fetch('/api/issues/submit-changes',{
            method: "POST",
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" }
          })
        .then( () => {
            this.props.getTicketData()
            this.updateTicket(true, index)
        })
        
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

    deleteTicket(id) {
        let payload = {
            id: id
        }
        fetch('/api/issues/delete-ticket',{
            method: "POST",
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" }
          })
        .then( () => {
            this.props.getTicketData()
        })
    }
    
    render() {
        return(
            <div className = "view-tickets-box">
                <h2 className="form-heading">
                    {this.props.match.params.str + ' Tickets'}
                </h2>
                <div className="project-info-container">
                    <div>
                        <h4>
                            Add User
                        </h4>
                        <p>
                            Add a new teammate to this project by entering their username below.
                        </p>
                        <input id='newTeammate' />
                        <div className='button-wrap button-wrap--wrap2'>
                            <button className='view-button view-button--less-margin view-button--less-padding'
                                    onClick={this.addUser.bind(this)}>
                                Add Teammate
                            </button>
                        </div>
                    </div>
                    <div>
                        <h4>
                            Current Team
                        </h4>
                        <ul className='user-list'>
                            {this.state.currentUsers.map( x => <li>{x}</li>)}
                        </ul>
                    </div>
                </div>
                <div className='ticket-box'>
                   
                    {this.props.ticketData.map((x,i) => {
                        if(x.project_name.toLowerCase() == this.props.match.params.str.toLowerCase()) {
                            if (this.props.ticketStatus[i]) {
                                return (
                                    <StaticTicket data ={x}
                                                changeStatus={this.changeStatus}
                                                updateTicket={this.updateTicket}
                                                index={i}
                                                id={x['_id']}
                                                status={true}/>
                                )       
                            }
                            else {
                                return (
                                    <EditTicket data ={x}
                                                deleteTicket={this.deleteTicket}
                                                submitChanges={this.submitChanges}
                                                changeStatus={this.changeStatus}
                                                updateTicket={this.updateTicket}
                                                index={i}
                                                id={x['_id']}
                                                status={false}/>
                                ) 
                            }
                        }
                    })}
                </div>
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