import React, { useState } from 'react';
import UserInput from './UserInput';
import UserOutput from './UserOutput';


// function ageState() {
//     const random = Math.floor(Math.random() * 20);
//     let age = `${random} year`;
//     if (random > 1) {
//         age = `${random} years`;
//     }
//     return age;
// }

// const person = (props) => {
//     return (<h3>My name is {props.name}, {ageState()} old</h3>);
// }



function Person() {
    const [userState, setUserState] = useState({
        value: ''
    })

    const changeState = (event) => {
        setUserState({ value: event.target.value })
    }

    return (
        <div>
            <UserInput onInputChange={changeState} value={userState.value} />
            <UserOutput userName={userState.value} />
        </div>
    );
}

export default Person;