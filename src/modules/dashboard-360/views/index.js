import React from 'react';
import PropTypes from 'prop-types';
import RouteSwitch from 'src/components/RouteSwitch';
import { connect } from 'react-redux';
import { COMMON } from '../redux/constants';

function View({ accountType, routes }) {
    routes = routes.filter((route) => (
        (route.accountType ? route.accountType === accountType : true)
        || route.accountType === COMMON
    ));
    console.log(routes);
    return (
        <RouteSwitch routes={routes} redirectPath="/dash360/admin/dashboard" />
    );
}

View.propTypes = {
    accountType: PropTypes.string,
    routes: PropTypes.array
};

const mapStateToProps = (state) => ({
    // Added admin just for testing
    accountType: state.accountType || 'ADMIN'
});

export default connect(mapStateToProps)(View);
