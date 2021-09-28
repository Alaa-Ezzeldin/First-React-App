import { Card, CardMedia, LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { httpClient } from "../../shared/http";
import logo from "../../shared/assets/mrmeeseeks.jpg"
import Error from "../../shared/assets/components/error";
import { useParams } from "react-router-dom";
import ReadPost from "./readPost";
import UpdatePost from "./updatePost";
import { SnackBarComponent } from "../../shared/snackBar";

export default function Post() {
    let { id } = useParams();
    const [isLoading, setLoader] = useState(true);
    const [requestLoader, setRequestLoader] = useState(false);
    const [post, setPost] = useState({});
    const [error, setError] = useState({});
    const [layout, setLayout] = useState(1);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        httpClient.get(`posts/${id}`).then(responsePosts => {
            setTimeout(() => {
                setPost(responsePosts.data);
                setLoader(false)
            }, 1000);

        }).catch(err => {
            setLoader(false);
            if (err.response.status === 404) {
                setError({
                    status: 404,
                    title: 'Not Found',
                    message: 'The post you requested does not exist or has moved',
                    severity: 'error'
                })
            }
        })
    }, [id]);

    function updatePostHandle(title, body) {

        const requestBody = {
            id: id,
            title: title,
            body: body,
            userId: post.id
        }
        setRequestLoader(true);
        httpClient.put(`posts/${id}`, requestBody).then(response => {
            setTimeout(() => {
                setPost(response.data);
                setLayout(1);
                setOpenSnackbar(true);
                setRequestLoader(false)
            }, 1000);
        })
    }

    const handleClose = () => {
        setOpenSnackbar(false);
    };


    return (
        <div>
            {requestLoader ? <LinearProgress color="secondary" /> : null}
            {isLoading ? <LinearProgress color="secondary" /> : error.status ? <Error severity="error" title={error.title} status={error.status}> <span>{error.message} </span></Error> :
                <Card style={{ 'width': '50%', 'margin': '20px auto' }} sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        height="300"
                        image={logo}
                        alt="green iguana"
                    />

                    {layout === 1 ? <ReadPost post={{ title: post.title, body: post.body }} setLayOut={(id) => setLayout(id)} /> : <UpdatePost post={{ title: post.title, body: post.body }} setLayOut={(id) => setLayout(id)} updatePost={(title, body) => updatePostHandle(title, body)} />}

                </Card>
            }
            {openSnackbar ? <SnackBarComponent closeSnackbar={handleClose}>Post updated successfully!</SnackBarComponent> : null}
        </div >

    );
}

