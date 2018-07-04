import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getTicketData } from  '../../../redux/reducers/ticketReducer'

class NewProject extends React.Component {
    submitForm() {
        let payload = {
            projectName: document.getElementById('projectName').value,
            organization: document.getElementById('organization').value,
            createdBy: document.getElementById('createdBy').value
        }
        fetch('/posts/newProject',{
                method: "POST",
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" }
                })
                .then( () => {
                    this.props.getTicketData()
                    alert("Project has been Created. Go to view tickets to see the project")
                })
    }
    render() {
        return(
            <div>
                <form className="new-ticket-form">
                    <label>
                        <h4>Project Name</h4>
                    </label>
                    <input id="projectName"/>
                    <label>
                        <h4>Organization</h4>
                    </label>
                    <input id='organization' />
                    <label>
                        <h4>Created By</h4>
                    </label>
                    <input id='createdBy'/>
                </form>

                <button className="form-button" onClick={this.submitForm.bind(this)}>
                    Submit
                </button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ticketData: state.ticketReducer.ticketData
})

const mapDispatchToProps = dispatch =>{
return bindActionCreators(
    {
        getTicketData
    },
    dispatch
)}

export default connect(mapStateToProps, mapDispatchToProps)(NewProject)