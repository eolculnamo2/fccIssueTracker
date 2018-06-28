import React from 'react'

class NewTicket extends React.Component {
    submitForm() {
    
        let payload = {
            title: document.getElementById('title').value,
            text: document.getElementById('text').value,
            createdBy: document.getElementById('createdBy').value,
            assignedTo: document.getElementById('assignedTo').value,
            open: document.getElementById('open').value,
            statusText: document.getElementById('statusText').value
        }

        fetch('/posts/newTicket',{
                method: "POST",
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" }
                })
    }
    render() {
        return(
            <div>
                <form className="new-ticket-form">
                    <label>
                    <h4>Title</h4>
                    </label>
                    <input id='title' />

                    <label>
                    <h4>Text</h4>
                    </label>
                    <input id='text'/>

                    <label>
                    <h4>Created By</h4>
                    </label>
                    <input id='createdBy'/>

                    <label>
                    <h4>Assigned To</h4>
                    </label>
                    <input id='assignedTo' />

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

                    <label>
                    <h4>Status Text</h4>
                    </label>
                    <input id='statusText' />

                </form>

                <button className="form-button" onClick={this.submitForm.bind(this)}>
                    Submit
                </button>
            </div>
        )
    }
}

export default NewTicket