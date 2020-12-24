import { DataGrid } from '@material-ui/data-grid';
import { makeStyles, ButtonGroup, Box, Button } from '@material-ui/core';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CommonAlert from 'src/components/CommonAlert';
import Spinner from 'src/components/Spinner';

const colConfig = [
  {
    field: 'questionId',
    headerName: 'Question Id',
    flex: 1,
    renderCell: rowData => (
      <Link to={`/surveys/questions/${rowData.row.questionId}/view`}>
        {rowData.row.questionId}
      </Link>
    )
  },
  { field: 'label', headerName: 'Question Title', flex: 1 },
  {
    field: 'questionType',
    headerName: 'Type',
    flex: 1
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  div: {
    margin: '0.5rem 1rem 0 1rem'
  }
}));

const ViewQuestions = props => {
  const classes = useStyles();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async function getQuestions() {
      try {
        const res = await Axios.get('/survey/questions');
        setQuestions(res.data);
      } catch (Err) {
        console.log(Err);
        setError(Err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className={classes.div}>
      <Box marginBottom={2}>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          <Button>
            <Link to="/surveys/questions/new">Add New Questions</Link>
          </Button>
          <Button>
            <Link to="/surveys/edit">Edit Questions</Link>
          </Button>
        </ButtonGroup>
      </Box>
      {!loading ? (
        error ? (
          <CommonAlert />
        ) : (
          <div>
            {props.location.state && (
              <>
                <CommonAlert
                  variant="success"
                  text={
                    props.location.state === 'create'
                      ? 'Question Created Successfully'
                      : 'Question Updated Successfully'
                  }
                />
                <br />
              </>
            )}
            <DataGrid
              columns={colConfig}
              rows={questions.map(q => ({ ...q, id: q.questionId }))}
              style={{ width: '100%' }}
              className={classes.root}
              autoHeight="true"
              pageSize={5}
            />
          </div>
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default ViewQuestions;
