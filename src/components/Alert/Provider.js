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
                clearTimeout(this.timer);

                this.setState({
                    message,
                    showAlert: true,
                });

                this.timer = setTimeout(() => {
                    this.setState({
                        message: '',
                        showAlert: false,
                    });
                }, 2000);
            },
        };
    }
    constructor(props) {
        super(props);

        this.timer = null;
        this.state = {
            message: '',
            showAlert: false,
        };
    }

    render() {
        const { message, showAlert } = this.state;
        return (
            <React.Fragment>
                {this.props.children}
                <Alert message={message} show={showAlert} />
            </React.Fragment>
        );
    }
}

export default Provider;
