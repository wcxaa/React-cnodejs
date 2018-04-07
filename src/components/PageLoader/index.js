import React from 'react';
import PropTypes from 'prop-types';

import { LoadingPage } from '@components/Loading';
import { Error } from '@components/Error';

class PageLoader extends React.Component {
    static propTypes = {
        state: PropTypes.shape({
            isFetching: PropTypes.bool.isRequired,
            error: PropTypes.object,
        }).isRequired,
        isInit: PropTypes.bool,
    };
    static defaultProps = {
        isInit: true,
    };
    render() {
        const { state, isInit } = this.props;
        const { isFetching, error } = state;

        return (
            <React.Fragment>
                {isInit && isFetching ? <LoadingPage /> : ''}
                {isInit && error ? <Error error={error} /> : ''}
                {!isInit || (!isFetching && !error) ? this.props.children : ''}
            </React.Fragment>
        );
    }
}

export default PageLoader;
