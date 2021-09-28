import React from "react";
import { Button, Divider, FormControl, makeStyles, TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ErrorMessage, Formik } from "formik";
import * as Yup from 'yup';


export default function LoginDialog(props) {
    const styles = useStyles();

    function submitForm(value) {
        props.handleDialogAction(value);
    }
    const initialValues = {
        username: ''
    };
    const validations = Yup.object().shape({
        username: Yup.string()
            .required('name is required')
    });

    return (
        <Dialog open={true} fullWidth>
            <DialogTitle>Can't Login?</DialogTitle>
            <Formik
                initialValues={initialValues}
                validationSchema={validations}
                onSubmit={(values) => {
                    submitForm(values)
                }}>
                {formProps => (
                    <form onSubmit={formProps.handleSubmit} className={styles.form}>

                        <DialogContent>
                            <DialogContentText>
                                you can log in using email
                                <span className={styles.data}> admin@test.com </span>
                                and password
                                <span className={styles.data}> 1111 </span>
                            </DialogContentText>
                            <h1>
                                <Divider />
                            </h1>
                            <h3>try log in with you name:</h3>
                            <FormControl className={styles.formControl}>
                                <TextField
                                    placeholder="enter your name here ex: Alaa Ezzeldin"
                                    fullWidth
                                    name="username"
                                    onChange={formProps.handleChange}
                                    value={formProps.values.username}
                                    error={formProps.errors.username && formProps.touched.username}
                                />
                                <ErrorMessage name="username">{msg => <div className={styles.errorMsg} >{msg}</div>}</ErrorMessage>

                            </FormControl>

                        </DialogContent>
                        <DialogActions>
                            <Button type="submit">
                                Login with name
                            </Button>
                            <Button onClick={() => {
                                props.closeDialog();
                            }}>
                                Cancel
                            </Button>
                        </DialogActions>
                    </form>
                )}
            </Formik>
        </Dialog>
    );
}

const useStyles = makeStyles({
    errorMsg: {
        color: '#ff0000'
    },
    data: {
        color: '#56bbfc'
    },
    formControl: {
        width: '100%'
    }
});


