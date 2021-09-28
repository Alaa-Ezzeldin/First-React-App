import React from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export function SnackBarComponent(props) {

    return (<Snackbar open={true} autoHideDuration={3000}
        onClose={props.closeSnackbar}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}>
        <Alert onClose={props.closeSnackbar} severity="success" sx={{ width: '100%' }}>
            {props.children}
        </Alert>
    </Snackbar>
    );
}