import React from "react";
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { useHistory } from "react-router-dom";


export default function Error(props) {
    const history = useHistory();

    return (
        <Alert severity={(props.severity) ?? 'info'}>
            {(props.status && props.title) ? <AlertTitle>Error {props.status}: {props.title}</AlertTitle> : null}
            {props.children} — <strong style={{ cursor: 'pointer' }} onClick={() => { console.log("CLICKKK"); history.goBack() }} >go back</strong>
        </Alert>
    )
}