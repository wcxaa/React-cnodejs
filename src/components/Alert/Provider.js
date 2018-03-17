import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Alert from './Alert';

class Provider extends React.Component {
    static childContextTypes = {
        alert: PropTypes.func,
    };
    getChildContext() {
        return {
            alert: message => {
                this.setState({
                    message,
                });
            },
        };
    }
    constructor(props) {
        super(props);

        this.state = {
            message: '',
        };

        this.disappear = this.disappear.bind(this);
    }

    disappear() {
        this.setState({
            message: '',
        });
    }
    render() {
        const { message } = this.state;
        return (
            <React.Fragment>
                {this.props.children}
                <Alert message={message} disappear={this.disappear} />
            </React.Fragment>
        );
    }
}

export default Provider;
