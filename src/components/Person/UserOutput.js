import React from "react";
import './userInput.css';

const UserOutput = (props) => {
    return (
        <div className="card">
            <p> you just typed: </p>
            <p className="value"> {props.userName} </p>

        </div>
    );
}

export default UserOutput;