import React from 'react'
import { BrowserRouter as Router, Link, Route, withRouter } from 'react-router-dom'
import { connect } from  'react-redux'
import { bindActionCreators } from 'redux'
import { setTicketData, updateTicketState, getTicketData } from '../redux/reducers/ticketReducer'
import './scss/main.scss'
import Home from './components/Home/Home'
import NewTicket from './components/NewTicket/NewTicket'
import NewProject from './components/NewProject/NewProject'
import ProjectsPage from './components/Projects/ProjectsPage'
import Ticket from './components/Ticket/Ticket'
import Authentication from './components/Authentication/Authentication'

class App extends React.Component {
    componentWillMount() {
        fetch('/api/issues/apitestproject')
       .then( res => {
           return res.json()
       })
       .then( data => {
           this.props.setTicketData(data)
           this.props.updateTicketState()
           this.props.getTicketData()
       }) 
   }
    render(){
        return(
            <div>
                <header>
                    <div className="nav-bar">
                        <div className="links">
                            <Link to='/'><span>Home</span></Link>
                            <Link to='/new-ticket'><span>New Ticket</span></Link>
                            <Link to='/new-project'><span>New Project</span></Link>
                            <Link to='/view-tickets'><span>My Projects</span></Link>
                        </div>
                        <div className="user-details">
                            <p>
                                {this.props.loggedIn !== false ? this.props.username : <Link to='/login'><span>Login</span></Link>}
                            </p>
                        </div>
                    </div>
                </header>
                <Route exact path='/' component={Home} />
                <Route exact path='/new-project' component={NewProject} />
                <Route exact path='/new-ticket' component={NewTicket} />
                <Route exact path='/view-tickets' component={ProjectsPage} />
                <Route exact path='/login' component={Authentication} />
                <Route exact path='/show-tickets/:str'  render={ props => (
                    <Ticket {...props}/>
                )}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ticketData: state.ticketReducer.ticketData,
        username: state.ticketReducer.username,
        loggedIn: state.ticketReducer.loggedIn
    }
} 

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setTicketData,
      updateTicketState,
      getTicketData
    },
    dispatch
  );
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))