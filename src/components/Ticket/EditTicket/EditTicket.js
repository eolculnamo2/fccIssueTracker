import React from 'react'
import moment from 'moment'
import '../../../scss/main.scss'

const EditTicket = (props) => {
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
                    Assigned To: <input id="new-assigned-to"/>
                </div>
            </div>
            <div className="ticket-info">
                <div>  
                    Status: <select id ="open">
                                <option value={true}>
                                    Open
                                </option>
                                <option value={false}>
                                    Close
                                </option>
                            </select>
                </div>
            </div>
            <div className="ticket-status-text ticket-status-text--issue">
                Issue Text:<br/><br/>
                <span>{props.data['issue_text']}</span>
            </div>
            <div className="ticket-status-text">
                Status Text:<br/><br/>
                <textarea id="new-status-text"/>
            </div>
            <div className="button-wrap">
            <button onClick={props.deleteTicket.bind(this,props.id)}
                        className={'close-button'}>
                        Delete Ticket
                </button>
                <button onClick={props.changeStatus.bind(this,props.data, "open", props.data.open === true ? false : true)}
                    className={props.data.open === true ? 'close-button' : 'reopen-button'}>
                    {props.data.open === true ? 'Close' : 'Reopen'}
                </button>
                <button onClick={props.updateTicket.bind(this,true,props.index)}
                className="back-button">
                    Back
                </button>
                <button onClick={props.submitChanges.bind(this,props.id,props.index)}
                        className={'edit-button'}>
                        Save Ticket
                </button>
            </div>
        </div>
    )
}

export default EditTicket