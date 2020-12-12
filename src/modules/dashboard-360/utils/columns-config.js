import React from 'react';
import { Link } from 'react-router-dom';

export const orderColumns = [
  {
    field: 'OrderNumber',
    headerName: 'Order ID',
    renderCell: rowData => (
      <Link to={`/dash360/admin/orders/${rowData.row.OrderNumber}`}>
        {rowData.row.OrderNumber}
      </Link>
    )
  },
  {
    field: 'CreatedType',
    flex: 1,
    headerName: 'Created Type'
  },
  {
    field: 'StatusKey',
    flex: 1,
    headerName: 'Status'
  },
  {
    flex: 1,
    field: 'CreatedOn',
    headerName: 'Created On'
  }
];

export const invoicesColumns = [
  {
    renderCell: rowData => (
      <Link to={`/dash360/admin/invoices/${rowData.row.InvoiceNumber}`}>
        {rowData.row.InvoiceNumber}
      </Link>
    ),
    headerName: 'Invoice Number',
    field: 'InvoiceNumber',
    flex: 1
  },
  {
    field: 'InvoiceAmount',
    headerName: 'Amount',
    flex: 1
  },
  {
    field: 'Status',
    headerName: 'Status',
    flex: 1
  },
  {
    field: 'BillingMobile',
    headerName: 'Billing Mobile',
    flex: 1
  }
];
