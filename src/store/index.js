import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import { PersistGate } from 'redux-persist/es/integration/react';

import user from './user';
import message from './message';
import topicList from './topicList';

const config = {
    key: 'root',
    storage,
};

const store = createStore(
    persistCombineReducers(config, {
        user,
        message,
        topicList,
    }),
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
);

const persistor = persistStore(store);

const Store = props => (
    <Provider store={store}>
        <PersistGate persistor={persistor}>{props.children}</PersistGate>
    </Provider>
);

export default Store;
