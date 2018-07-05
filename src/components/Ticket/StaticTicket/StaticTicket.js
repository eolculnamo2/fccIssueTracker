import React from 'react'
import moment from 'moment'
import '../../../scss/main.scss'
//props.data['key']
const StaticTicket = props => {
        return (
            <div className={props.data['open'] ? "a-ticket" : "a-ticket a-ticket--closed"}>
                <div className="ticket-header">
                    <div>
                        {props.data['issue_title']}
                    </div>
                    <div> 
                    {props.data['open'] == true ? 'Open' : 'Closed'} 
                    </div>
                </div>
                <div className="ticket-info">
                    <div>  
                        Created On: <span>{
                            moment(props.data['created_on']).format('MMMM Do YYYY, h:mm:ss a')}</span>
                    </div>
                    <div>
                        Updated On: <span>{
                            moment(props.data['updated_on']).format('MMMM Do YYYY, h:mm:ss a')}</span>
                    </div>
                </div>
                <div className="ticket-info">
                    <div>  
                        Created By: <span>{props.data['created_by']}</span>
                    </div>
                    <div>
                        Assigned To: <span>{props.data['assigned_to']}</span>
                    </div>
                </div>
                <div className="ticket-info">
                    <div>  
                        Status: <span>{props.data['open'] == true ? 'Open' : 'Closed'}</span>
                    </div>
                </div>
                <div className="ticket-status-text ticket-status-text--issue">
                    Issue Text:<br/><br/>
                    <span>{props.data['issue_text']}</span>
                </div>
                <div className="ticket-status-text">
                    Status Text:<br/><br/>
                    <span>{props.data['status_text']}</span>
                </div>
                <div className="button-wrap">
                    <button onClick={props.updateTicket.bind(this,false, props.index)}
                        className={'edit-button'}>
                        Update Ticket
                    </button>
                </div>
            </div>
        )
}

export default StaticTicket