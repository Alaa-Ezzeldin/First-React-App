import { Button, makeStyles } from "@material-ui/core";
import React from "react";

export default function PostCard(props) {
    const styles = useStyles();

    return (
        <div className={styles.postContainer}>
            <div className={styles.postCard}>
                <h3>{props.title}</h3>
                <p>{props.body}</p>
                <div className={styles.btnContainer}>
                    <Button className={styles.btn} onClick={props.showPost}> more details</Button>

                </div>
            </div>

        </div>
    );
}

const useStyles = makeStyles({
    postContainer: {
        padding: '0px 20px',
        boxSizing: 'border-box',
        marginBottom: '25px'
    },
    postCard: {
        background: '#eee',
        borderRadius: '5px',
        padding: '20px',
    },
    btnContainer: {
        textAlign: 'end'
    },
    btn: {
        color: '#2b97dc',
        fontWeight: '500',
    }
});