import React from 'react';
import PropTypes from 'prop-types';
import RouteSwitch from 'src/components/RouteSwitch';
import { connect } from 'react-redux';
import { ADMIN, COMMON } from '../redux/constants';

function View({ accountType, routes }) {
    routes = routes.filter((route) => (
        (route.accountType ? route.accountType === accountType : true)
        || route.accountType === COMMON
    ));
    return (
        <RouteSwitch routes={routes} redirectPath={accountType === ADMIN ? '/dash360/admin/dashboard' : '/dash360/user/profile'} />
    );
}

View.propTypes = {
    accountType: PropTypes.string,
    routes: PropTypes.array
};

const mapStateToProps = (state) => ({
    // Added admin just for testing
    accountType: state.accountType || 'USER'
});

export default connect(mapStateToProps)(View);
