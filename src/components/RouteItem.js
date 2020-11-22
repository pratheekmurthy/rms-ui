import React from 'react';
import { Route } from 'react-router-dom';

/**
 * Render a route with potential sub routes
*/
export default function RouteWithSubRoutes(route) {
    console.log(route.routes?.map((subRoute) => ({
        ...subRoute,
        path: route.path + subRoute.path
     })));
    return (
      <Route
        path={route.path}
        exact={route.exact}
        render={(props) => (
          <route.component
            {...props}
            routes={route.routes?.map((subRoute) => ({
               ...subRoute,
               path: route.path + subRoute.path
            }))}
          />
        )}
      />
    );
}
