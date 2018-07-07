import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getTicketData } from  '../../../redux/reducers/ticketReducer'

class NewProject extends React.Component {
    submitForm() {
        
        let payload = {
            projectName: document.getElementById('projectName').value,
            organization: document.getElementById('organization').value,
            repo: document.getElementById('repo').value,
            createdBy: this.props.username,
            users: [this.props.username]
        }

        fetch('/posts/newProject',{
                method: "POST",
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" }
                })
                .then( () => {
                    this.props.getTicketData()
                    alert("Project has been Created. Go to view projects to see the project")
                    window.location.pathname='/view-tickets/'
                })
    }
    showAlert() {
        alert("Must be logged in to create a new project.")
    }
    render() {
        return(
            <div>
                <h2 className="page-heading">
                    New Project
                </h2>
            <div className="form-wrap">
                <h2 className='form-heading'>
                    New Project
                </h2>
                <form className="new-ticket-form">
                    <span>
                        <label>
                            <h4>Project Name</h4>
                        </label>
                        <input id="projectName"/>
                    </span>
                    <span>
                        <label>
                            <h4>Organization</h4>
                        </label>
                        <input id='organization' />
                    </span>
                    <span>
                        <label>
                            <h4>Repository Link</h4>
                        </label>
                        <input id='repo' />
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
    username: state.ticketReducer.username
})

const mapDispatchToProps = dispatch =>{
return bindActionCreators(
    {
        getTicketData
    },
    dispatch
)}

export default connect(mapStateToProps, mapDispatchToProps)(NewProject)