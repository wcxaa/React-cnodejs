import React from 'react';
import PropTypes from 'prop-types';

import { LoadingPage } from '@components/Loading';
import { Error } from '@components/Error';

class PageLoader extends React.Component {
    static propTypes = {
        state: PropTypes.shape({
            isRequesting: PropTypes.bool.isRequired,
            error: PropTypes.object,
        }).isRequired,
        isInit: PropTypes.bool,
    };
    static defaultProps = {
        isInit: true,
    };
    render() {
        const { state, isInit } = this.props;
        const { isRequesting, error } = state;

        return (
            <React.Fragment>
                {isInit && isRequesting ? <LoadingPage /> : ''}
                {isInit && error ? <Error error={error} /> : ''}
                {!isInit || (!isRequesting && !error) ? this.props.children : ''}
            </React.Fragment>
        );
    }
}

export default PageLoader;
