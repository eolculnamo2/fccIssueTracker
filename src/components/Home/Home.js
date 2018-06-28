import React from 'react'
import '../../scss/main.scss';

class Home extends React.Component {
    render() {
        return(
            <div className="home-page-box">
                <h1>
                    Free Code Camp Issue Tracker Projcet
                </h1>
                <em>Functionally similar to https://protective-garage.glitch.me/ </em>
                <p>
                    View API link at <a href = "/api/issues/apitestproject">here</a>
                </p>
            </div>
        )
    }
}

export default Home