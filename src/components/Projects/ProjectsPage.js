import React from 'react'
import moment from 'moment'
import { connect } from  'react-redux'
import { bindActionCreators } from 'redux'
import { setCurrentProject } from '../../../redux/reducers/ticketReducer'
import Ticket from '../Ticket/Ticket'

class ProjectsPage extends React.Component {
    goToTickets(projectName) {
        window.location.pathname='/show-tickets/'+projectName
    }
    render() {
        return(
            <div>
                <h2 className="page-heading">
                    Projects
                </h2>
                <div className="projects-container">
                    {this.props.projectData.map( project => {
                            return (
                                <div className="project">
                                    <h2>
                                        {project.project_name}
                                    </h2>
                                    <p>
                                        Organization: {project.organization}
                                    </p>
                                    <em>
                                        Created By: {project.created_by} on {moment(project.created_on).format('MMMM Do YYYY')}
                                    </em>
                                    <div className='button-wrap'>
                                        <button onClick={this.goToTickets.bind(this,project.project_name)}
                                        className='edit-button'>
                                            View Tickets
                                        </button>
                                    </div>
                                </div>
                            )
                        })             
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        projectData: state.ticketReducer.projectData
    }
} 

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentProject
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage)