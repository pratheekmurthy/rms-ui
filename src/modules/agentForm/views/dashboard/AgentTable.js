import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'agentName', headerName: 'Agent name', width: 130 },
  { field: 'agentnumber', headerName: 'Agent Number', width: 130 },
  {
    field: 'email',
    headerName: 'Email',
    width: 160,
  },
  {
    field: 'location',
    headerName: 'Location',
    width: 160,
   
  },
];

const rows = [
  { id: 1, agentName: 'chaitra', agentnumber: '9448531031', email: 'chaitra@gmail.com' ,location:'Bangalore'},
  { id: 2, agentName: 'suma', agentnumber: '7867371881', email: 'suma@gmail.com' ,location:'Mysore'},
  { id: 3, agentName: 'latha', agentnumber: '6728838291', email: 'latha@gmail.com' ,location:'Bangalore'},
  { id: 4, agentName: 'priya', agentnumber: '9737371873', email: 'priya@gmail.com' ,location:'Bangalore'},
  { id: 5, agentName: 'sonu', agentnumber: '9767712828', email: 'sonu@gmail.com' ,location:'Mysore'},

];

export default function DataGridDemo() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}