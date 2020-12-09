import { Link } from '@material-ui/core';
import React from 'react';

export default [
    { field: 'title', headerName: 'Survey Title', flex: 1 },
    { headerName: 'Id', flex: 1, render: (rowData) => (<Link to={`/surveys/survey/${rowData.id}`}>{rowData.id}</Link>) },
    { field: 'startDate', headerName: 'Start Date', flex: 1 },
    { field: 'endDate', headerName: 'End Date', flex: 1 }
];
