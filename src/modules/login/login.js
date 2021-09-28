import React, { useState } from "react";
import { Button, FormControl, TextField } from '@material-ui/core';
import { Formik, ErrorMessage } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from 'yup';
import LoginDialog from "./loginDialog";
import * as cookieHandler from '../../shared/cookieHandler'

export default function LoginControl(props) {
    const styles = useStyles();
    const [open, setOpenDialog] = useState(false);
    const [error, setError] = useState('');


    const initialValues = {
        email: '',
        password: ''
    };
    const validations = Yup.object().shape({
        email: Yup.string()
            .required('email is required')
            .email('invalid email address'),
        password: Yup.string().required('password is required')
    });

    function submitForm(values) {
        if (values.email === "admin@test.com" && values.password === "1111") {
            cookieHandler.setUserDataFromCookies({ authenticated: true, email: values.email });
            props.logInAction();
            setError('')
        } else {
            setError('invalid email or password')
        }
    }

    function handleInputChange(e, props) {
        props.setFieldValue(e.target.name, e.target.value, true)
        setError('')
    }

    function handleLogInByUsername(values) {
        cookieHandler.setUserDataFromCookies({ authenticated: true, email: null, username: values.username });
        props.logInAction();
        setOpenDialog(false)
    }




    return (
        <div>
            <h1 className={styles.loginTitle}> Please Log In.. </h1>
            {open ? <LoginDialog handleDialogAction={(values) => handleLogInByUsername(values)} closeDialog={() => setOpenDialog(false)} /> : null}
            <Formik
                initialValues={initialValues}
                validationSchema={validations}
                onSubmit={(values) => {
                    submitForm(values)
                }}>
                {props => (
                    <form onSubmit={props.handleSubmit} className={styles.form}>
                        {error ? <p className={styles.invalidLogin}>{error} </p> : <p></p>}
                        <FormControl className={styles.formControl}>
                            <TextField label="Email" variant="outlined"
                                type="text"
                                name="email"
                                onChange={(e) => handleInputChange(e, props)}
                                onBlur={props.handleBlur}
                                value={props.values.email}
                                error={props.errors.email && props.touched.email}
                            />
                            <ErrorMessage name="email">{msg => <div className={styles.errorMsg} >{msg}</div>}</ErrorMessage>
                        </FormControl>

                        <FormControl className={styles.formControl}>
                            <TextField label="Password" variant="outlined"
                                type="password"
                                name="password"
                                onChange={(e) => handleInputChange(e, props)}
                                onBlur={props.handleBlur}
                                value={props.values.password}
                                error={props.errors.password && props.touched.password}
                            />
                            <ErrorMessage name="password">{msg => <div className={styles.errorMsg} >{msg}</div>}</ErrorMessage>
                        </FormControl>
                        <p></p>
                        <Button className={styles.loginBtn} type="submit"> Login </Button>
                    </form>
                )}
            </Formik>
            <div className={styles.dialogBtn}>
                <Button type="button" onClick={() => setOpenDialog(true)}> can't log in?</Button>
            </div>
        </div >
    )
}


const useStyles = makeStyles({
    loginTitle: {
        textAlign: 'center',
        color: 'yellowgreen',
        margin: '40px 0px 20px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '40%',
        margin: '10px auto',
        background: '#fdfdfd',
        padding: '50px 20px',
        borderRadius: '15px',
        boxShadow: '0px 0px 10px #ccc',
    },
    formControl: {
        width: '100%',
        margin: '10px auto',
        minHeight: '85px'
    },
    errorMsg: {
        color: '#ff0000'
    },
    loginBtn: {
        backgroundColor: '#56bbfc',
        color: '#fff',
        borderRadius: '20px',
        padding: '10px 8px',
        '&:hover': {
            backgroundColor: '#2b97dc'
        }
    },
    dialogBtn: {
        width: 'calc(40% + 40px)',
        margin: 'auto',
        textAlign: 'end',
    },
    invalidLogin: {
        color: '#ff0000',
        margin: '0px 10px 10px'
    }


})
