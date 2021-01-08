import React from 'react';
import { Link } from 'react-router-dom';

export default [
  {
    field: 'surveyId',
    headerName: 'Survey Id',
    flex: 1,
    renderCell: rowData => (
      <Link to={`/surveys/${rowData.row.surveyId}/view`}>
        {rowData.row.surveyId}
      </Link>
    )
  },
  { field: 'title', headerName: 'Survey Title', flex: 1 },
  {
    field: 'description',
    headerName: 'Description',
    flex: 1,
    renderCell: rowData => (
      <span style={{ textOverflow: 'ellipsis' }}>
        {rowData.row.description}
      </span>
    )
  },
  {
    headerName: 'Questions',
    field: 'questions',
    flex: 1,
    renderCell: rowData => rowData.row.questions.length
  },
  {
    headerName: 'View Preview',
    field: 'viewPreview',
    flex: 1,
    renderCell: rowData => (
      <Link to={`/surveys/${rowData.row.surveyId}/form`}>Preview</Link>
    )
  }
];
