import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { setNewCrumb, setUrlMatchFound } from 'src/redux/action';

/**
 * Render a route with potential sub routes
 */
function RouteWithSubRoutes(route) {
  useEffect(() => {
    if (route.activatedRoute === route.computedMatch.url) {
      route.setMatchFound();
    }
  }, [route.activatedRoute]);
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => (
        <route.component
          {...props}
          routes={route.routes?.map(subRoute => ({
            ...subRoute,
            path: route.path + subRoute.path,
            crumb: (typeof route.crumb === 'string'
              ? [route.crumb]
              : route.crumb || []
            ).concat(subRoute.crumb || [''])
          }))}
        />
      )}
    />
  );
}
const mapStateToProps = state => ({
  activatedRoute: state.activatedRoute
});

const mapDispatchToProps = dispatch => ({
  setCrumb: route => dispatch(setNewCrumb(route)),
  setMatchFound: () => dispatch(setUrlMatchFound(true))
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteWithSubRoutes);
