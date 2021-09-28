import React from "react"

const Validation = (props) => {
    let validationMsg;
    if (props.length >= 5) {
        validationMsg = <p>text long enough!</p>
    } else {
        validationMsg = <p>text too short</p>
    }
    return validationMsg;
}

export default Validation;