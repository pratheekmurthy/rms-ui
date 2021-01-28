import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Axios from 'axios';
import Editagent from './EditAgent'
const columns = [

  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'EmployeeName', headerName: 'Agent name', width: 130 },
  { field: 'External_num', headerName: 'Contact Number', width: 200 },
  {
    field: 'EmailID',
    headerName: 'Email',
    width: 200,
  },
  {
    field: 'Location',
    headerName: 'Location',
    width: 160,

  },
  {
    field: 'AgentType',
    headerName: 'Agent Type',
    width: 160,

  },
  {
    field: 'GroupName',
    headerName: 'Groups',
    width: 160,

  },
];



export default function DataGridDemo() {
  const [agents, setAgents] = useState([]);
  const [editform, setEditform] = useState(false);
  const [editData, setEditData] = useState([]);

  function TableData() {
    const url = 'https://mt3.granalytics.in/admin/agent/viewAgent'

    Axios.post(url)
      .then(function (response) {
        // console.log(JSON.stringify(response.data.data));
        setAgents(response.data.data)

      })
      .catch(function (error) {
        console.log(error);
      });

  }
  useEffect(() => {
    TableData()


  }, [])
  return (
    <div style={{ height: 400, width: '100%' }}>
      {agents.length > 0 ? <DataGrid rows={agents.map(calls => ({
        ...calls,
        id: calls.UserID
      }))} columns={columns} pageSize={5} checkboxSelection
        onSelectionChange={(newSelection) => {


          const url = 'https://mt3.granalytics.in/admin/agent/getAgent'


          Axios.post(url, newSelection)
            .then(function (response) {
              // console.log(JSON.stringify(response.data));
              if (response.data.status === 200) {
                setEditform(true)
                setEditData(response.data.data)
              }

            })
          // setSelection(newSelection.rowIds);
        }} /> : <></>}
      {editData.length > 0 ? <Editagent
        EditData={editData}
        TableData={TableData} /> : <></>}
    </div>
  );
}