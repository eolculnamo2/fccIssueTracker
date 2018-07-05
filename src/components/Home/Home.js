import React from 'react'
import OptionBox from './OptionBox/OptionBox'
import '../../scss/main.scss';

let OptionBoxes = [{
        heading: 'New Ticket',
        txt: 'Create a New Ticket for an Existing Project.',
        icon: 'images/briefing.png',
        lnk: '/new-ticket'
    },
    {
        heading: 'New Project',
        txt: "Make and save a New Project to help keep track of your team's issues.",
        icon: 'images/project.png',
        lnk: '/new-project'
    },
    {
        heading: 'View Projects',
        txt: "View all current projects available. Find ways to contribute.",
        icon: 'images/settings-gears.png',
        lnk: '/view-tickets'
    }]

class Home extends React.Component {
    render() { 
        return(
            <div className="home-page-box">
                <h1>
                    Free Code Camp Issue Tracker Project
                </h1>
                <em>Functionally similar to https://protective-garage.glitch.me/ </em>
                <p>
                    View API link at <a href = "/api/issues/apitestproject">here</a>
                </p>
            <div className="option-box-container">
            {OptionBoxes.map( x => {
                return <OptionBox heading={x.heading}
                                  txt={x.txt}
                                  icon={x.icon}
                                  lnk={x.lnk} />
            })}
            </div>
            </div>
        )
    }
}

export default Home