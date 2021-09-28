import React from "react";
import { useState } from "react/cjs/react.development";

function FormContainer() {
    let [formState, setFormState] = useState({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        email: '',
        mobile: '',
        policy_check: false,
        gender: 'male'
    });
    let keyMap = new Map();
    Object.keys(formState).forEach(key => {
        keyMap.set(key, labelName(key))
    });

    const labelName = (key) => {
        
    }

    const inputFields = Object.keys(formState).map((key) => {
        return (
            <label>
                {keyMap.get(key)}
                <input type="text" value={state[key]} onChange={handleChange} />
            </label>
        )
    });

    const handleChange = () => { console.log("I AM HERE") }
    return (
        <div>
            <h1>Create your account:</h1>
            <form>
                {inputFields}
            </form>
        </div>


    )
}

export default FormContainer;