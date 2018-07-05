import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux' 
import { setUserStatus } from  '../../../redux/reducers/ticketReducer'

class Authentication extends React.Component {
    constructor() {
        super()
        this.state = {
            register: false
        }
    }
    authenticate() {
        if (this.state.register) {
            let payload = {
                username: document.getElementById('username').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                confirmPassword: document.getElementById('confirm-password').value
            }

            fetch('/authenticate/register',{
                method: "POST",
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" },
                credentials: "same-origin"
                })
                .then( res => res.json())
                .then( data => {
                    if (data.name === 'authenticated') {
                        alert("Account Created.")
                        this.props.setUserStatus(data.user, true)
                        window.location.pathname='/view-tickets/'
                    }
                    else if (data.name === 'invalid-credentials') {
                        alert('Passwords Do Not Match')
                    }
                    else {
                        alert('Account Creation Failed. Try a different username')
                    }
                })
        }
        else {
            let payload = {
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            }

            fetch('/authenticate/login',{
                method: "POST",
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" },
                credentials: "same-origin"
                })
                .then( res => res.json())
                .then( data => {
                    if(data.name === 'authenticated') {
                        alert("Login Successful.")
                        this.props.setUserStatus(data.user, true)
                       window.location.pathname='/view-tickets/'
                    }
                    else {
                        alert('Did not authenticate. Please try again.')
                    }
                })

        }
    }
    render() {
        return(
            <div className="form-wrap">
                <h2 className="form-heading">
                    {this.state.register ? "Register" : "Login"}
                </h2>
                <form className="new-ticket-form">
                    <span>
                        <h4>
                            Username
                        </h4>
                        <input id="username" />
                    </span>
                    <span style = {this.state.register ? { display: 'block' } : { display: 'none'}}>
                        <h4>
                            Email
                        </h4>
                        <input id="email"/>
                      
                    </span>
                    <span>
                        <h4>
                            Password
                        </h4>
                        <input type="password" id="password"/>
                    </span>
                    <span style = {this.state.register ? { display: 'block' } : { display: 'none'}}>
                        <h4>
                           Confirm Password
                        </h4>
                        <input type="password" id="confirm-password"/>
                    </span>
                </form>
                <div className="button-wrap">
                    <button onClick={ () => this.state.register ? this.setState({register:false}) : this.setState({register:true})} 
                            className="view-button view-button--less-padding">
                        {this.state.register ? "Existing User?" : "New User?"}
                    </button>
                    <button onClick={this.authenticate.bind(this)}
                            className="view-button view-button--less-padding">
                        {this.state.register ? "Register" : "Login"}
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    username: state.ticketReducer.username,
    loggedIn: state.ticketReducer.loggedIn
})

const mapDispatchToProps = dispatch =>{
return bindActionCreators(
    {
        setUserStatus
    },
    dispatch
)}


export default connect(mapStateToProps, mapDispatchToProps)(Authentication)