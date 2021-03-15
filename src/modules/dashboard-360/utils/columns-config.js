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


export const lastFiveCallData = [
  // {
  //   // renderCell: rowData => (
  //   //   <Link to={`/dash360/admin/agentlastfive/${rowData.row.InvoiceNumber}`}>
  //   //     {rowData.row.InvoiceNumber}
  //   //   </Link>
  //   // ),
  //   headerName: 'Unique ID',
  //   field: 'asterixUniqueID',
  //   flex: 1
  // },

  {
    field: 'CallerName',
    headerName: 'CallerName',
    flex: 1
  },
  {
    field: 'callerapplication',
    headerName: 'Caller application',
    flex: 1
  },
  {
    field: 'issuetype',
    headerName: 'issuetype',
    flex: 1
  },
  {
    field: 'devicetype',
    headerName: 'devicetype',
    flex: 1
  },
  {
    field: 'connectivitytype',
    headerName: 'connectivitytype',
    flex: 1
  },
  {
    field: 'ostype',
    headerName: 'ostype',
    flex: 1
  },
  {
    field: 'category',
    headerName: 'Category',
    flex: 1
  },
  {
    field: 'subcategory',
    headerName: 'Subcategory',
    flex: 1
  },
  {
    field: 'subcategoryitem',
    headerName: 'Subcategory item',
    flex: 1
  },
  {
    field: 'issuedescription',
    headerName: 'issuedescription',
    flex: 1
  },
  {
    field: 'solution',
    headerName: 'solutions',
    flex: 1
  },
  {
    field: 'comments',
    headerName: 'comments',
    flex: 1
  },
  {
    field: 'type',
    headerName: 'issue status',
    flex: 1
  }
];

export const AgentCallColumns = [
  {
    // renderCell: rowData => (
    //   <Link to={`/dash360/admin/agentlastfive/${rowData.row.InvoiceNumber}`}>
    //     {rowData.row.InvoiceNumber}
    //   </Link>
    // ),
    headerName: 'Unique ID',
    field: 'asterixUniqueID',
    flex: 1
  },
  // {
  //   field: 'agentID',
  //   headerName: 'Agent ID',
  //   flex: 1
  // },
  {
    field: 'type',
    headerName: 'Type',
    flex: 1
  },
  {
    field: 'category',
    headerName: 'Category',
    flex: 1
  },
  {
    field: 'subcategory',
    headerName: 'Sub Category',
    flex: 1
  },
  {
    field: 'solution',
    headerName: 'solution',
    flex: 1
  },
  {
    field: 'comments',
    headerName: 'Comments',
    flex: 1
  },
  {
    field: 'created',
    headerName: 'Date',
    flex: 1
  }
];
export const DistributerCallColumns = [
  {
    // renderCell: rowData => (
    //   <Link to={`/dash360/admin/agentlastfive/${rowData.row.InvoiceNumber}`}>
    //     {rowData.row.InvoiceNumber}
    //   </Link>
    // ),
    headerName: 'Unique ID',
    field: 'asterixUniqueID',
    flex: 1
  },
  // {
  //   field: 'agentID',
  //   headerName: 'Agent ID',
  //   flex: 1
  // },
  {
    field: 'type',
    headerName: 'Type',
    flex: 1
  },
  {
    field: 'category',
    headerName: 'Category',
    flex: 1
  },
  {
    field: 'subcategory',
    headerName: 'Sub Category',
    flex: 1
  },
  {
    field: 'solution',
    headerName: 'solution',
    flex: 1
  },
  {
    field: 'comments',
    headerName: 'Comments',
    flex: 1
  },
  {
    field: 'created',
    headerName: 'Date',
    flex: 1
  }
];

export const CallerInteractioncolumns = [
  {
    field: 'CallerName',
    headerName: 'CallerName',
    flex: 1
  },
  {
    field: 'callerapplication',
    headerName: 'Caller Application',
    flex: 1
  },
  {
    field: 'issuetype',
    headerName: 'Issue Type',
    flex: 1
  },
  {
    field: 'category',
    headerName: 'Patner Name',
    flex: 1
  },
  {
    field: 'seccategory',
    headerName: 'Tag',
    flex: 1
  },
  {
    field: 'subcategory',
    headerName: 'Sub Tag 1',
    flex: 1
  },
  {
    field: 'secsubcategory',
    headerName: 'Sub Tag 2',
    flex: 1
  },
  {
    field: 'type',
    headerName: 'Type',
    flex: 1
  },

  {
    field: 'comments',
    headerName: 'comments',
    flex: 1
  },

  {
    field: 'created',
    headerName: 'Date',
    flex: 1
  },
  {
    field: 'callermobilenumber',
    headerName: 'caller Number',
    flex: 1
  }
];
