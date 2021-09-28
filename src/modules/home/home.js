import { LinearProgress, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { httpClient } from "../../shared/http";
import PostCard from "./postCard";


export default function Home() {

    const styles = useStyles();
    const history = useHistory();
    const [posts, setPosts] = useState([]);
    const [isLoading, setLoader] = useState(true)

    useEffect(() => {
        httpClient.get('posts').then(responsePosts => {
            setTimeout(() => {
                setPosts(responsePosts.data);
                setLoader(false)
            }, 1000);

        })
    }, [])

    function showPostHandle(id) {
        history.push(`post/${id}`);
    }

    const postsArr = posts.map((post) => {
        return (<PostCard key={post.id} title={post.title} body={post.body} showPost={() => showPostHandle(post.id)} />)
    })

    return (
        <div>
            {isLoading ? <LinearProgress color="secondary" /> :
                (
                    <div><h1 className={styles.homeTitle}>here is the posts list..</h1>
                        <div className={styles.postsArr}>
                            {postsArr}
                        </div>
                    </div>
                )
            }
        </div>
    );
}

const useStyles = makeStyles({
    homeTitle: {
        color:'#2b97dc',
        paddingLeft:'20px',
        fontWeight:'400'
    },
    spinner: {
        color: '#ccc',
        width: '100px !important',
        height: '100px !important'
    }
});