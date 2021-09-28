import { Button } from "@material-ui/core";
import React from "react";
import { Route, useRouteMatch, Switch } from "react-router";
import { Link } from "react-router-dom";
import Error from "../../shared/assets/components/error";
import Post from "./post";

export default function Posts() {

    let { path, url } = useRouteMatch();


    return (
        <div>
            <Switch>
                <Route exact path={path}>
                    <Error
                        severity="warning"
                    >
                        <span>Please select a post</span>
                    </Error>
                    <Link style={{ textDecoration: 'none' }} to={`${url}/${Math.floor(Math.random() * 100) + 1}`}>
                        <Button variant="contained" color="primary" style={{ backgroundColor: '#2b97dc' }}>
                            Choose Random post
                        </Button>
                    </Link>
                </Route>
                <Route path={`${path}/:id`}>
                    <Post />
                </Route>
            </Switch>
        </div>
    );
}