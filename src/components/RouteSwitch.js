import React from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import RouteWithSubRoutes from './RouteItem';

function RouteSwitch({ routes, redirectPath, isRoot }) {
  const location = useLocation();
  console.log(routes);
  return (
    <Switch>
      {isRoot && (
        <Redirect from="/:url*(/+)" to={location.pathname.slice(0, -1)} />
      )}
      {routes.map(route => (
        <RouteWithSubRoutes {...route} key={route} />
      ))}
      {redirectPath && (
        <Route path="*">
          <Redirect to={redirectPath} />
        </Route>
      )}
    </Switch>
  );
}

RouteSwitch.propTypes = {
  routes: PropTypes.any,
  redirectPath: PropTypes.string,
  isRoot: PropTypes.bool
};

export default RouteSwitch;
