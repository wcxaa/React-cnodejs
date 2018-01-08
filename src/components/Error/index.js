import React from 'react';
import PropTypes from 'prop-types';

class Error extends React.Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
    };
    render() {
        return (
            <div className="error-container">
                出错了, error:<br />
                {this.props.error}
            </div>
        );
    }
}

export default Error;
