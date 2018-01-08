import React from 'react';
import PropTypes from 'prop-types';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './Alert.less';

class Alert extends React.Component {
    static propTypes = {
        message: PropTypes.any.isRequired,
        show: PropTypes.bool.isRequired,
    };

    render() {
        const { message, show } = this.props;
        return (
            <TransitionGroup>
                {show ? (
                    <CSSTransition classNames="slide" addEndListener={() => {}}>
                        <div className="alert-container">{message.toString()}</div>
                    </CSSTransition>
                ) : (
                    ''
                )}
            </TransitionGroup>
        );
    }
}

export default Alert;
