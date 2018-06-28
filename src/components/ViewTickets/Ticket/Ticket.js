import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setTicketData } from '../../../../redux/reducers/ticketReducer'
import '../../../scss/main.scss'

class Ticket extends React.Component {
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
    render() {
        return (
            <div className='ticket-box'>
                {this.props.ticketData.forEach((x)=>{
                    return (<p>{x['issue_title']}</p>)
                })}
            </div>
        )
    }
}

const mapStateToProps = state => {
    alert(JSON.stringify('state'+JSON.stringify(state)))
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
export default connect(mapStateToProps, mapDispatchToProps)(Ticket)