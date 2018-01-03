import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from '@components/Routes';
import Layout from '@components/Layout';
import NotFound from '@components/NotFound';
import Home from '@pages/Home';
import TopicList from '@pages/TopicList';

const routes = [
    {
        path: '/',
        component: Home,
        exact: true,
    },
    {
        path: '/',
        component: Layout,
        routes: [
            {
                path: 'topic-list',
                component: TopicList,
            },
        ],
    },
    {
        path: '*',
        component: NotFound,
    },
];

const Router = props => (
    <BrowserRouter>
        <Routes routes={routes} />
    </BrowserRouter>
);

export default Router;
