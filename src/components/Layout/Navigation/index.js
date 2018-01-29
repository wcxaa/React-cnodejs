import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { PAGE_TYPE_MAP } from '@js/constants';
import './index.less';

class Navigation extends React.Component {
    static propTypes = {
        user: PropTypes.shape({
            loginname: PropTypes.string,
            avatar_url: PropTypes.string,
        }).isRequired,
        message: PropTypes.shape({
            notReadCount: PropTypes.number.isRequired,
        }).isRequired,
        location: PropTypes.object.isRequired,
    };
    constructor(props) {
        super(props);

        this.state = {
            showMenu: false,
        };

        this.resetMenu = this.resetMenu.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
    }
    shouldComponentUpdate(nextProps) {
        if (this.props.location !== nextProps.location) {
            this.resetMenu();
        }
        return true;
    }
    resetMenu() {
        this.setState({
            showMenu: false,
        });
    }
    toggleMenu() {
        this.setState(prevState => ({
            showMenu: !prevState.showMenu,
        }));
    }
    render() {
        const { location, user, message } = this.props;
        return (
            <div className={`navigation ${this.state.showMenu ? 'show-menu' : ''}`}>
                <header className="navigation-header">
                    <span
                        className="navigation-icon-menu iconfont icon-menu-hamburger"
                        onClick={this.toggleMenu}
                    />
                    <span className="navigation-title" />
                    <Link to="/add-topic" className="navigation-icon-send iconfont icon-send" />
                </header>
                <div className="navigation-divider" />
                <section className="navigation-sidebar">
                    <div className="navigation-userinfo">
                        {user.loginname ? (
                            <div>
                                <Link to="/user/" className="navigation-sidebar-link">
                                    <span className="navigation-icon navigation-avatar-wrapper iconfont icon-account">
                                        {user.avatar_url ? (
                                            <img
                                                className="navigation-avatar"
                                                src={user.avatar_url}
                                                alt="avater"
                                            />
                                        ) : (
                                            ''
                                        )}
                                    </span>
                                    {user.loginname}
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <Link
                                    to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
                                    className="navigation-sidebar-link"
                                >
                                    <span className="navigation-icon navigation-icon-login iconfont icon-login" />{' '}
                                    登录
                                </Link>
                            </div>
                        )}
                    </div>
                    <div className="navigation-sidebar-links">
                        <Link to="/topic-list?tab=all" className="navigation-sidebar-link">
                            <span className="navigation-icon iconfont icon-all" />
                            {PAGE_TYPE_MAP['all']}
                        </Link>
                        <Link to="/topic-list?tab=good" className="navigation-sidebar-link">
                            <span className="navigation-icon iconfont icon-good" />
                            {PAGE_TYPE_MAP['good']}
                        </Link>
                        <Link to="/topic-list?tab=share" className="navigation-sidebar-link">
                            <span className="navigation-icon iconfont icon-share" />
                            {PAGE_TYPE_MAP['share']}
                        </Link>
                        <Link to="/topic-list?tab=ask" className="navigation-sidebar-link">
                            <span className="navigation-icon iconfont icon-ask" />
                            {PAGE_TYPE_MAP['ask']}
                        </Link>
                        <Link to="/topic-list?tab=job" className="navigation-sidebar-link">
                            <span className="navigation-icon iconfont icon-job" />
                            {PAGE_TYPE_MAP['job']}
                        </Link>
                        <Link to="/topic-list?tab=dev" className="navigation-sidebar-link">
                            <span className="navigation-icon iconfont icon-test" />
                            {PAGE_TYPE_MAP['dev']}
                        </Link>
                        <Link to="/message" className="navigation-sidebar-link divide">
                            <span className="navigation-icon iconfont icon-message" />
                            {PAGE_TYPE_MAP['message']}
                            {message.notReadCount > 0 ? (
                                <span className="navigation-message-not-read-count" />
                            ) : (
                                ''
                            )}
                        </Link>
                        <Link to="/about" className="navigation-sidebar-link">
                            <span className="navigation-icon iconfont icon-about" />
                            {PAGE_TYPE_MAP['about']}
                        </Link>
                    </div>
                </section>
                <div className="navigation-page-cover" onClick={this.toggleMenu} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        message: state.message,
    };
};

export default withRouter(connect(mapStateToProps)(Navigation));
