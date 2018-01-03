import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

const resolve = (...paths) => paths.join('/').replace(/\/+/, '/');

class Routes extends React.Component {
    static propTypes = {
        routes: PropTypes.arrayOf(
            PropTypes.shape({
                path: PropTypes.string.isRequired,
                component: PropTypes.func.isRequired,
                routes: PropTypes.array,
            }),
        ).isRequired,
    };

    constructor(props) {
        super(props);

        this.parsedRoutes = [];
        this.state = {
            parsedRoutes: this.parsedRoutes,
        };

        this.setRecursiveRoute = this.setRecursiveRoute.bind(this);
    }

    componentWillMount() {
        const { routes } = this.props;

        routes.forEach(route => this.setRecursiveRoute(route));
    }
    setRecursiveRoute(route, path: '', Component) {
        if (!route.routes || !route.routes.length) {
            this.parsedRoutes.push({
                path: resolve(path, route.path),
                component: props =>
                    Component ? (
                        <Component {...props} RouterView={() => <route.component {...props} />} />
                    ) : (
                        <route.component {...props} />
                    ),
                exact: route.exact,
                strict: route.strict,
            });
        } else {
            route.routes.forEach(subRoute =>
                this.setRecursiveRoute(subRoute, route.path, route.component),
            );
        }
    }

    render() {
        return (
            <Switch>
                {this.parsedRoutes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        render={props => <route.component {...props} />}
                        exact={route.exact}
                        strict={route.strict}
                    />
                ))}
            </Switch>
        );
    }
}

export default Routes;
