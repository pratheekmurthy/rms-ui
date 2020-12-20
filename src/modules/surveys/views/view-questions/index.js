import { DataGrid } from '@material-ui/data-grid';
import React from 'react';
import { Link } from 'react-router-dom';

const arrayOfQuestions = [
  {
    id: 1,
    questionType: 'rating',
    questionName: 'rating',
    label: 'rating'
  },
  {
    id: 2,
    questionType: 'textarea',
    questionName: 'textarea',
    label: 'textarea',
    additionalConfig: {
      rows: 3
    }
  },
  {
    id: 3,
    questionType: 'textarea',
    questionName: 'textarea',
    label: 'textarea',
    additionalConfig: {
      rows: 3
    }
  },
  {
    id: 4,
    questionType: 'textarea',
    questionName: 'textarea',
    label: 'textarea',
    additionalConfig: {
      rows: 3
    }
  },
  {
    id: 5,
    questionType: 'textarea',
    questionName: 'textarea',
    label: 'textarea',
    additionalConfig: {
      rows: 3
    }
  },
  {
    id: 6,
    questionType: 'textarea',
    questionName: 'textarea',
    label: 'textarea',
    additionalConfig: {
      rows: 3
    }
  },
  {
    id: 7,
    questionType: 'textarea',
    questionName: 'textarea',
    label: 'textarea',
    additionalConfig: {
      rows: 3
    }
  }
];

const ViewQuestions = () => {
  return (
    <div style={{ height: '50%', width: '100%' }}>
      <DataGrid
        columns={[{ field: 'id' }, { field: 'name' }]}
        rows={arrayOfQuestions.map((question, index) => ({
          ...question,
          id: question.id,
          name: question.questionName
        }))}
        onCellClick={() => <Link to={`/surveys/edit`}>{'Deepak'}</Link>}
      />
    </div>
  );
};

export default ViewQuestions;
