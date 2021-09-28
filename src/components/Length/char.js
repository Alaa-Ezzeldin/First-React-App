import React from "react"

const Char = (props) => {

    return <h2 onClick={props.deleteChar}>{props.char}</h2>
}

export default Char;