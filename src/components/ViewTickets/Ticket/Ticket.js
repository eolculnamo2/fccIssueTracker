import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setTicketData, getTicketData } from '../../../../redux/reducers/ticketReducer'
import '../../../scss/main.scss'

class Ticket extends React.Component {
    changeStatus(x) {
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
        return (
            <div className='ticket-box'>
                {this.props.ticketData.map((x,i)=>{
                    return (
                    <div className={x['open'] ? "a-ticket" : "a-ticket a-ticket--closed"}>
                        <div className="ticket-header">
                            <div>
                                {x['issue_title']}
                            </div>
                            <div> 
                            {x['open'] == true ? 'Open' : 'Closed'} 
                            </div>
                        </div>
                        <div className="ticket-info">
                            <div>  
                                Created On: <span>{x['created_on']}</span>
                            </div>
                            <div>
                                Updated On: <span>{x['updated_on']}</span>
                            </div>
                        </div>
                        <div className="ticket-info">
                            <div>  
                                Created By: <span>{x['created_by']}</span>
                            </div>
                            <div>
                                Assigned To: <span>{x['assigned_to']}</span>
                            </div>
                        </div>
                        <div className="ticket-info">
                            <div>  
                                Status: <span>{x['open'] == true ? 'Open' : 'Closed'}</span>
                            </div>
                        </div>
                        <div className="ticket-status-text ticket-status-text--issue">
                            Issue Text:<br/><br/>
                            <span>{x['issue_text']}</span>
                        </div>
                        <div className="ticket-status-text">
                            Status Text:<br/><br/>
                            <span>{x['status_text']}</span>
                        </div>
                        <div className="button-wrap">
                            <button onClick={this.changeStatus.bind(this, x)}
                                className={x.open === true ? 'close-button' : 'reopen-button'}>
                                {x.open === true ? 'Close' : 'Reopen'}
                            </button>
                        </div>
                    </div>)
                })}
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
      getTicketData
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Ticket)