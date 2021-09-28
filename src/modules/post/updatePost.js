import { Button, CardActions, CardContent, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";

export default function UpdatePost(props) {
    const styles = useStyles();
    const [post, setPost] = useState({
        title: props.post.title,
        body: props.post.body
    })

    const handleChange = (event) => {
        const fieldName = event.target.name;
        setPost(prevState => ({
            ...prevState, [fieldName]: event.target.value
        }));
    };


    return (
        <div>
            <CardContent className={styles.cardContent}>
                <TextField
                    label="Post Title"
                    className={styles.TextField}
                    value={post.title}
                    name="title"
                    onChange={handleChange} />

                <TextField
                    label="Post Body"
                    variant="outlined"
                    value={post.body}
                    name="body"
                    onChange={handleChange}
                    multiline />
            </CardContent>
            <CardActions style={{ 'justifyContent': 'flex-end' }}>
                <Button size="small" color="primary" onClick={() => { props.updatePost(post.title, post.body) }}>
                    update post
                </Button>

                <Button size="small" color="primary" onClick={() => { props.setLayOut(1) }}>
                    Cancel
                </Button>
            </CardActions>
        </div>
    )
}

const useStyles = makeStyles({
    cardContent: {
        display: 'flex',
        flexDirection: 'column'
    },
    TextField: {
        marginBottom: '20px'
    }
})