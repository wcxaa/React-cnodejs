import React from 'react';
import PropTypes from 'prop-types';

import { CSSTransition } from 'react-transition-group';
import './Alert.less';

class Alert extends React.Component {
    static propTypes = {
        message: PropTypes.any.isRequired,
        disappear: PropTypes.func.isRequired,
    };
    constructor(props) {
        super(props);

        this.state = {
            visiable: false,
            show: false,
        };
    }
    componentWillReceiveProps(nextProps) {
        const { message, disappear } = nextProps;

        if (message) {
            this.setState({
                visiable: true,
                show: true,
            });

            const func = () => {
                setTimeout(() => {
                    disappear();
                }, 2000);
                this.$alert.removeEventListener('transitionend', func);
            };
            this.$alert.addEventListener('transitionend', func);
        } else {
            this.setState({
                visiable: true,
                show: false,
            });

            const func = () => {
                this.setState({
                    visiable: false,
                    show: false,
                });
                this.$alert.removeEventListener('transitionend', func);
            };
            this.$alert.addEventListener('transitionend', func);
        }
    }
    render() {
        const { message } = this.props;
        const { show, visiable } = this.state;

        return (
            <div
                className={`alert-container ${show ? 'show' : ''} ${visiable ? 'visiable' : ''}`}
                ref={ele => (this.$alert = ele)}
            >
                {message.toString()}
            </div>
        );
    }
}

export default Alert;
