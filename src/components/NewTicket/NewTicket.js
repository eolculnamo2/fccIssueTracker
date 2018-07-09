import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getTicketData } from  '../../../redux/reducers/ticketReducer'

class NewTicket extends React.Component {
    componentDidMount() {
        let pn = document.getElementById('projectName').value
        this.watchProjectSelection(pn)
        
        document.getElementById('projectName').addEventListener('change', () => {
            pn = document.getElementById('projectName').value
            this.watchProjectSelection(pn)
        })
    }
    submitForm() {
    
        let payload = {
            title: document.getElementById('title').value,
            text: document.getElementById('text').value,
            createdBy: document.getElementById('createdBy').value,
            assignedTo: document.getElementById('assignedTo').value,
            open: document.getElementById('open').value,
            statusText: document.getElementById('statusText').value,
            projectName: document.getElementById('projectName').value.trim().toLowerCase()
        }

        fetch('/posts/newTicket',{
                method: "POST",
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" }
                })
                .then( () => {
                    this.props.getTicketData()
                    alert("New Ticket Added. Click View Projects and select your project to see your Ticket.")
                    window.location.pathname='/view-tickets/'
                })
    }
    showAlert() {
        alert("Must be logged in to create a new ticket.")
    }

    watchProjectSelection(projectName) {
        let payload = {projectName: projectName}

        document.getElementById('assignedTo').innerHTML = ''

        fetch('/api/issues/get-projects',{
            method: "POST",
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" }
            })
            .then( res => res.json() )
            .then( data => {
                data.users.forEach( x => {
                    document.getElementById('assignedTo').innerHTML += '<option value ='+x+'>'+x+'</option>'
                })
            })
        }

    render() {
        return(
            <div>
                <h2 className="page-heading">
                    New Ticket
                </h2>
            <div className="form-wrap">
                <h2 className="form-heading">
                    New Ticket
                </h2>
                <form className="new-ticket-form">
                <span>
                    <label>
                        <h4>Project Name</h4>
                    </label>
                    <select id="projectName">
                        {this.props.projectData.map( x => {
                            if (x.users.indexOf(this.props.username) > -1) {
                                return (      
                                    <option value = {x.project_name}>
                                        {x.project_name}
                                    </option>
                                )
                            }
                        })}
                    </select>
                </span>
                <span>
                    <label>
                        <h4>Ticket Title</h4>
                    </label>
                    <input id='title' />
                </span>
                <span>
                    <label>
                        <h4>Text</h4>
                    </label>
                    <input id='text'/>
                </span>
                <span>
                    <label>
                        <h4>Created By</h4>
                    </label>
                    <input style={{'background': '#efefef'}} value={this.props.username} id='createdBy' disabled/>
                </span>
                <span>
                    <label>
                        <h4>Assigned To</h4>
                    </label>
                    <select id='assignedTo'>
                    </select>
                </span>
                <span>
                    <label>
                        <h4>Open/Closed</h4>
                    </label>
                    <select id='open'>
                        <option value={true}>
                            Open
                        </option>
                        <option value={false}>
                            Closed
                        </option>
                    </select>
                </span>
                <span>
                    <label>
                        <h4>Status Text</h4>
                    </label>
                    <input id='statusText' />
                </span>
                </form>

                <button className="form-button" 
                        onClick={this.props.username !== null && this.props.username !== '' ? this.submitForm.bind(this) : this.showAlert.bind(this)}>
                    Submit
                </button>
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ticketData: state.ticketReducer.ticketData,
    projectData: state.ticketReducer.projectData,
    username: state.ticketReducer.username
})

const mapDispatchToProps = dispatch =>{
return bindActionCreators(
    {
        getTicketData
    },
    dispatch
)}

export default connect(mapStateToProps, mapDispatchToProps)(NewTicket)