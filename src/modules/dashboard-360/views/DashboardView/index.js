import React, { useState } from 'react';
// import AdvancedTable from '../../components/Advancedtable'
import PropTypes from 'prop-types';
import MainLoader from 'src/components/MainLoader';
import { connect } from 'react-redux';
// import CreateTicket from 'src/modules/ticketing/views/create-ticket';
// import TicketsList from './TicketsList';
import { setDistributorOrders } from '../../redux/action';
import { setSearchDistributor } from '../../../../redux/action';
import { setAgentCurrentStatus } from 'src/redux/action';

const SOCKETENDPOINT2 = "http://localhost:42002"

// const socket2 = socketIOClient(SOCKETENDPOINT5, { transports: ['websocket'], 'reconnection limit': 1000, 'max reconnection attempts': 'Infinity' });








const Dashboard = ({
  distributorOrders,
  setDistributorOrdersAction,
  setAgentCurrentStatusAction,
  setSearchDistributor,
  searchDistributor
}) => {
  const [loadingDetails, setLoadingDetails] = useState(true);


  var APIENDPOINT = SOCKETENDPOINT2;


  return !loadingDetails ? (
    <div style={{ position: 'relative' }}>

    </div >
  ) : (
    <MainLoader />
  );
};
Dashboard.propTypes = {
  distributorOrders: PropTypes.arrayOf(PropTypes.object),
  agentCurrentStatus: PropTypes.arrayOf(PropTypes.object),
  setDistributorOrdersAction: PropTypes.func,
  setAgentCurrentStatusAction: PropTypes.func,
  searchDistributor: PropTypes.string
};

const mapStateToProps = state => {
  return {
    distributorOrders: state.distributorOrders,
    agentCurrentStatus: state.currentCall,
    searchDistributor: state.searchDistributor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setDistributorOrdersAction: orders =>
      dispatch(setDistributorOrders(orders)),
    setAgentCurrentStatusAction: currentCall =>
      dispatch(setAgentCurrentStatus(currentCall)),
    setSearchDistributor: dist => dispatch(setSearchDistributor(dist))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
