import React from 'react'

const OptionBox = props => {
    return(
        <div className='option-box'>
            <h3>
                {props.heading}
            </h3>
            <p>
                {props.txt}
            </p>
            <img src={props.icon} />
            <div className="button-wrap">
                <a href={props.lnk} target="_blank">
                    <button className="view-button">
                        {props.heading}
                    </button>
                </a>
            </div>
        </div>
    )
}

export default OptionBox