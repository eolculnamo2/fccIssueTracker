import React from 'react'
import { BrowserRouter as Router, Link, Route, withRouter } from 'react-router-dom'
import { connect } from  'react-redux'
import { bindActionCreators } from 'redux'
import { setTicketData } from '../redux/reducers/ticketReducer'
import './scss/main.scss'
import Home from './components/Home/Home'
import NewTicket from './components/NewTicket/NewTicket'
import ViewTickets from './components/ViewTickets/ViewTickets'

class App extends React.Component {
    componentWillMount() {
        fetch('/api/issues/apitestproject')
       .then( res => {
           return res.json()
       })
       .then( data => {
           this.props.setTicketData(data)
           console.log(JSON.stringify(this.props.ticketData,null,3))
       }) 
   }
    render(){
        return(
            <div>
                <header>
                    <div className="links">
                        <Link to='/'><span>Home</span></Link>
                        <Link to='/new-ticket'><span>New Ticket</span></Link>
                        <Link to='/view-tickets'><span>View Tickets</span></Link>
                    </div>
                </header>
                <Route exact path='/' component={Home} />
                <Route exact path='/new-ticket' component={NewTicket} />
                <Route exact path='/view-tickets' component={ViewTickets} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ticketData: state.ticketReducer.ticketData
    }
} 

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setTicketData
    },
    dispatch
  );
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))