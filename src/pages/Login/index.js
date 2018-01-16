import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { handleLogin } from '@store/user';
import { withAlert } from '@components/Alert';
import { getQuery } from '@js/utils';
import './index.less';

class Login extends React.Component {
    static propTypes = {
        alert: PropTypes.func.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        handleLogin: PropTypes.func.isRequired,
        user: PropTypes.shape({
            isHandlingLogin: PropTypes.bool.isRequired,
        }).isRequired,
    };
    constructor(props) {
        super(props);

        this.state = { token: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            token: e.target.value.trim(),
        });
    }
    async handleSubmit(e) {
        e.preventDefault();

        const { token } = this.state;
        const { alert, location, history, handleLogin, user } = this.props;

        if (user.isHandlingLogin) {
            return false;
        }

        try {
            await handleLogin(token);
        } catch (error) {
            alert(error.message);
            return false;
        }

        const query = getQuery(location);
        let redirect = decodeURIComponent(query.redirect || '/');

        history.push(redirect);
    }
    render() {
        return (
            <form className="login" onSubmit={this.handleSubmit}>
                <input
                    className="token"
                    type="text"
                    value={this.state.token}
                    onChange={this.handleChange}
                    placeholder="Access Token"
                    maxLength="36"
                />
                <input type="submit" className="btn" value="登录" />
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps, { handleLogin })(withAlert(Login));
