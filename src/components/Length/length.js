import React, { useState } from "react";
import Char from "./char";
import Validation from "./validation";

function Length() {

    const [state, setState] = useState({
        value: '',
        length: 0
    });
    let characters = state.value.split('');

    const inputChangeHandle = (event) => {
        setState({
            value: event.target.value,
            length: event.target.value.length
        })
    };

    const deleteCharHandle = (index) => {
        characters.splice(index, 1);

        setState({
            value: characters.join(''),
            length: characters.length
        })
    }

    const charComponent = characters.map((char, index) => {
        return <Char char={char} deleteChar={() => deleteCharHandle(index)} key={index} />
    })

    return (
        <div>
            <input type="text" value={state.value} onChange={inputChangeHandle} />
            <Validation length={state.length} />
            {charComponent}
        </div>
    );
}

export default Length;