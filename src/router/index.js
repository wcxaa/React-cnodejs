import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Layout from '@components/Layout';
import NotFound from '@components/NotFound';
import Home from '@pages/Home';
import Login from '@pages/Login';
import TopicList from '@pages/TopicList';
import Topic from '@pages/Topic';
import About from '@pages/About';

const Router = props => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={Home} exact />
            <Route
                path="/"
                render={props => (
                    <Layout
                        RouterView={
                            <Switch>
                                <Route path="/login" component={Login} />
                                <Route path="/topic-list" component={TopicList} />
                                <Route path="/topic/:id" component={Topic} />
                                <Route path="/about" component={About} />
                                <Route component={NotFound} />
                            </Switch>
                        }
                    />
                )}
            />
        </Switch>
    </BrowserRouter>
);

export default Router;
