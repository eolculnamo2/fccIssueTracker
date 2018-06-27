import React from 'react'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import './scss/main.scss'
import Home from './components/Home/Home'
import NewTicket from './components/NewTicket/NewTicket'
import ViewTickets from './components/ViewTickets/ViewTickets'

class App extends React.Component {
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

export default App