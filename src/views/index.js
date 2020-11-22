import React from 'react';
import PropTypes from 'prop-types';
import RouteSwitch from 'src/components/RouteSwitch';
import { connect } from 'react-redux';
import rootRoutes from '../routes/index';
import { COMMON } from '../redux/constants';

function View({ accountType }) {
    const routes = rootRoutes.filter((route) => (
        (route.accountType ? route.accountType === accountType : true)
        || route.accountType === COMMON
    ));

    return (
        <RouteSwitch routes={routes} isRoot redirectPath="/" />
    );
}

View.propTypes = {
    accountType: PropTypes.string
};

const mapStateToProps = (state) => ({
    // Added admin just for testing
    accountType: state.accountType || 'ADMIN'
});

export default connect(mapStateToProps)(View);
