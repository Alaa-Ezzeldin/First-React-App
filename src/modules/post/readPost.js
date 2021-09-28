import { Button, CardActions, CardContent, Typography } from "@material-ui/core";
import React from "react";

export default function ReadPost(props) {

    return (
        <div>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" color="primary">
                    {props.post.title}
                </Typography>
                <Typography variant="body2" >
                    {props.post.body}
                </Typography>
            </CardContent>
            <CardActions style={{ 'justifyContent': 'flex-end' }}>
                <Button size="small" color="primary" onClick={() => { props.setLayOut(2) }}>
                    update post
                </Button>
            </CardActions>
        </div>
    )
}