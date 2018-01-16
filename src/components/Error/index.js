import React from 'react';
import PropTypes from 'prop-types';

class Error extends React.Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
    };
    render() {
        const { error } = this.props;
        return (
            <div className="error-container">
                出错了, error:<br />
                {error && error.message}
            </div>
        );
    }
}

export default Error;
