import React from 'react';
import ReactDOM from 'react-dom';
import Store from './store';
import Router from './router';
import { Provider as AlertProvider } from '@components/Alert';

import 'github-markdown-css';
import '@less/common.less';

ReactDOM.render(
    <AlertProvider>
        <Store>
            <Router />
        </Store>
    </AlertProvider>,
    document.getElementById('root'),
);
