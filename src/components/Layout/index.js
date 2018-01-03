import React from 'react';
import PropTypes from 'prop-types';

import Navigation from '@components/Navigation';

class Layout extends React.Component {
    static propTypes = {
        RouterView: PropTypes.func,
    };

    render() {
        const { RouterView } = this.props;

        return (
            <div>
                <Navigation />
                <RouterView />
            </div>
        );
    }
}

export default Layout;
