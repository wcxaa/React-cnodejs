import React from 'react';
import PropTypes from 'prop-types';

const withAlert = WrappedComponent =>
    class WithAlert extends React.Component {
        static contextTypes = {
            alert: PropTypes.func.isRequired,
        };
        render() {
            return <WrappedComponent {...this.props} alert={this.context.alert} />;
        }
    };

export default withAlert;
