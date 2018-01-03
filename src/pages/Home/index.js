import React from 'react';
import PropTypes from 'prop-types';

import './index.less';
import imgStartup from './img/startup.png';

class Home extends React.Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
    };
    componentDidMount() {
        const { history } = this.props;
        setTimeout(() => {
            history.push('/topic-list');
        }, 2000);
    }
    render() {
        return (
            <div>
                <img className="startup" src={imgStartup} />
            </div>
        );
    }
}

export default Home;
