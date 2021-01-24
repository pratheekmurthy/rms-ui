import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'agentName', headerName: 'Agent name', width: 130 },
  { field: 'agentnumber', headerName: 'Agent Number', width: 200 },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
  },
  {
    field: 'location',
    headerName: 'Location',
    width: 160,
   
  },
  {
    field: 'agenttype',
    headerName: 'Agent Type',
    width: 160,
   
  },
];

const rows = [
  { id: 1, agentName: 'Chaitra', agentnumber: '9448531031', email: 'chaitra@gmail.com' ,location:'Bangalore', agenttype:'L1'},
  { id: 2, agentName: 'Suma', agentnumber: '7867371881', email: 'suma@gmail.com' ,location:'Mysore',agenttype:'L1'},
  { id: 3, agentName: 'Latha', agentnumber: '6728838291', email: 'latha@gmail.com' ,location:'Bangalore', agenttype:'L1'},
  { id: 4, agentName: 'Priya', agentnumber: '9737371873', email: 'priya@gmail.com' ,location:'Bangalore',agenttype:'L1'},
  { id: 5, agentName: 'Sonu', agentnumber: '9767712828', email: 'sonu@gmail.com' ,location:'Mysore',agenttype:'L1'},

];

export default function DataGridDemo() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}