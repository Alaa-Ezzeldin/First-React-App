import React from "react";
class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            password: '',
            warning: ''
        }
        this.handleLoginAction = this.handleLoginAction.bind(this);
        this.handleInputAction = this.handleInputAction.bind(this);

    }

    handleLoginAction() {
        const logInBtnVal = this.state.isLoggedIn;
        if (this.state.password === '1111') {
            this.setState({ ...this.state, isLoggedIn: !logInBtnVal, warning: '' })
        } else {
            this.setState({ ...this.state, warning: 'Incorrect Password, please try again' })
        }
    }

    handleInputAction(event) {
        this.setState({ ...this.state, password: event.target.value });
    }

    render() {
        return (
            <div>
                <Greeting isLoggedIn={this.state.isLoggedIn} onInputChange={this.handleInputAction} />
                <Warning warning={this.state.warning} />
                <Login isLoggedIn={this.state.isLoggedIn} btnClicked={this.handleLoginAction} />

            </div>
        );
    }
}

function Greeting(props) {
    if (props.isLoggedIn) {
        return <h2>Welcome Back!</h2>;
    } else {
        return (
            <div>
                <h2>Please login!</h2>
                <input type='password' value={props.password} onChange={props.onInputChange} />
            </div>
        );
    }
}

function Warning(props) {
    if (props.warning) {
        return <p> {props.warning} </p>
    } else {
        return null;
    }
}

function Login(props) {
    if (props.isLoggedIn) {
        return <button onClick={props.btnClicked}>Log Out</button>;
    } else {
        return <button onClick={props.btnClicked}>Log In</button>;
    }
}


export default LoginControl