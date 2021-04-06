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

export const CallsinQueuecolumns = [
  {
    field: 'CallerName',
    headerName: 'Time',
    flex: 1
  },
  {
    field: 'callerapplication',
    headerName: 'Queue',
    flex: 1
  },
  {
    field: 'issuetype',
    headerName: 'Caller Phone Number',
    flex: 1
  },
  {
    field: 'category',
    headerName: 'Duration in Queue',
    flex: 1
  },
  {
    field: 'Server',
    headerName: 'Server',
    flex: 1
  },
];

// callsinQueuecolumns, LiveCallscolumns, LiveCallscolumns2, omrIdleAgents, ChennaiIdleAgents

export const AgentLiveCallscolumns = [
  {
    field: 'CallerName',
    headerName: 'Agent Name',
    flex: 1
  },
  {
    field: 'callerapplication',
    headerName: 'Agent ID',
    flex: 1
  },
  {
    field: 'callerapplication',
    headerName: 'Caller Phone Number',
    flex: 1
  },
  {
    field: 'issuetype',
    headerName: 'Location',
    flex: 1
  },
  {
    field: 'category',
    headerName: 'Duration ',
    flex: 1
  },
  {
    field: 'Server',
    headerName: 'Server',
    flex: 1
  },
];

export const AgentLivestatuscolumns = [
  {
    field: 'sl.no',
    headerName: 'SL NO',
    flex: 1
  },
  {
    field: 'EmployeeName',
    headerName: 'Agent Name',
    flex: 1
  },
  {
    field: 'agentID',
    headerName: 'Agent Number',
    flex: 1
  },
  {
    field: 'EmailID',
    headerName: 'Email ID',
    flex: 1
  },
  {
    field: 'agentCallStatus',
    headerName: 'Agent Status ',
    flex: 1
  },
  {
    field: 'agentCallDispositionStatus',
    headerName: 'Disposition',
    flex: 1
  },
  {
    field: 'Location',
    headerName: 'Location',
    flex: 1
  },
  {
    field: 'breakStatus',
    headerName: 'Break Status',
    flex: 1
  },
  {
    field: 'Server',
    headerName: 'server',
    flex: 1
  },

];

export const AgentLivestatuscolumns1 = [
  {
    name: 'sl.no',
    label: 'SL NO',
    flex: 1,
    options: {
      filter: true,
      sort: true,
    }
  },

  {
    name: 'EmployeeName',
    label: 'Agent Name',
    flex: 1,
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: 'agentID',
    label: 'Agent Number',
    flex: 1,
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: 'EmailID',
    label: 'Email ID',
    flex: 1,
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: 'agentCallStatus',
    label: 'Agent Status ',
    flex: 1,
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: 'agentCallDispositionStatus',
    label: 'Disposition',
    flex: 1,
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: 'Location',
    label: 'Location',
    flex: 1,
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: 'breakStatus',
    label: 'Break Status',
    flex: 1,
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: 'difference',
    label: 'IDLE Time',
    flex: 1,
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: 'Server',
    label: 'server',
    flex: 1,
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: 'currentserver',
    label: 'current server',
    flex: 1,
    options: {
      filter: true,
      sort: true,
    }
  },

];

// export const callsinQueuecolumns = [
//   {
//     name: 'datetime_entry_queue',
//     label: 'Time',
//     flex: 1,
//     options: {
//       filter: true,
//       sort: true,
//     }
//   },

//   {
//     name: 'Queue',
//     label: 'Queue',
//     flex: 1,
//     options: {
//       filter: true,
//       sort: true,
//     }
//   },
//   {
//     name: 'callerid',
//     label: 'Caller Phone Number',
//     flex: 1,
//     options: {
//       filter: true,
//       sort: true,
//     }
//   },
//   {
//     name: 'duration',
//     label: 'Duration in Queue',
//     flex: 1,
//     options: {
//       filter: true,
//       sort: true,
//     }
//   },
//   {
//     name: 'ServerIP',
//     label: 'Server',
//     flex: 1,
//     options: {
//       filter: true,
//       sort: true,
//     }
//   }
// ];

// export const LiveCallscolumns = [
//   {
//     name: 'EmployeeName',
//     label: 'Agent Name',
//     flex: 1,
//     options: {
//       filter: true,
//       sort: true,
//     }
//   },

//   {
//     name: 'agentID',
//     label: 'Agent ID',
//     flex: 1,
//     options: {
//       filter: true,
//       sort: true,
//     }
//   },
//   {
//     name: 'callerid',
//     label: 'Caller Phone Number',
//     flex: 1,
//     options: {
//       filter: true,
//       sort: true,
//     }
//   },
//   {
//     name: 'Location',
//     label: 'Location',
//     flex: 1,
//     options: {
//       filter: true,
//       sort: true,
//     }
//   },
//   {
//     name: 'duration',
//     label: 'Duration',
//     flex: 1,
//     options: {
//       filter: true,
//       sort: true,
//     }
//   },
//   {
//     name: 'ServerIP',
//     label: 'server',
//     flex: 1,
//     options: {
//       filter: true,
//       sort: true,
//     }
//   }
// ];

export const callsinQueuecolumns = [
  {
    field: 'datetime_entry_queue',
    label: 'Time',
    sort: 'asc',
    width: 150
  },
  {
    field: 'Queue',
    label: 'Queue',
    sort: 'asc',
    width: 150
  },
  {
    field: 'callerid',
    label: 'Caller Phone Number',
    sort: 'asc',
    width: 150
  },
  {
    field: 'duration',
    label: 'Duration in Queue',
    sort: 'asc',
    width: 150
  },
  {
    field: 'ServerIP',
    label: 'Server',
    sort: 'asc',
    width: 150
  },
];

export const LiveCallscolumns = [
  {
    field: 'EmployeeName',
    label: 'Employee Name',
    sort: 'asc',
    width: 150
  },
  {
    field: 'agentID',
    label: 'Agent ID',
    sort: 'asc',
    width: 150
  },
  {
    field: 'callerid',
    label: 'Caller Phone Number',
    sort: 'asc',
    width: 150
  },
  {
    field: 'Location',
    label: 'Location',
    sort: 'asc',
    width: 150
  },
  {
    field: 'duration',
    label: 'Duration',
    sort: 'asc',
    width: 150
  },
  {
    field: 'ServerIP',
    label: 'Server',
    sort: 'asc',
    width: 150
  },


];

export const LiveCallscolumns1 = [
  {
    field: 'sl_No',
    label: 'sl_No',
    sort: 'asc',
    width: 150
  },
  {
    field: 'Agent_Number',
    label: 'Agent Number',
    sort: 'asc',
    width: 150
  },
  {
    field: 'Agent_Name',
    label: 'Agent Name',
    sort: 'asc',
    width: 150
  },
  {
    field: 'Caller_Name',
    label: 'Caller Name',
    sort: 'asc',
    width: 150
  },
  {
    field: 'callerNumber',
    label: 'callerNumber',
    sort: 'asc',
    width: 150
  },

  {
    field: 'callerapplication',
    label: 'callerapplication',
    sort: 'asc',
    width: 150
  },

  {
    field: 'callType',
    label: 'callType',
    sort: 'asc',
    width: 150
  },
  {
    field: 'issuetype',
    label: 'issuetype',
    sort: 'asc',
    width: 150
  },

  {
    field: 'category',
    label: 'category',
    sort: 'asc',
    width: 150
  },
  {
    field: 'subcategory',
    label: 'subcategory',
    sort: 'asc',
    width: 150
  },
  {
    field: 'subcategoryitem',
    label: 'subcategoryitem',
    sort: 'asc',
    width: 150
  },
  {
    field: 'connectivitytype',
    label: 'connectivitytype',
    sort: 'asc',
    width: 150
  },
  {
    field: 'ostype',
    label: 'ostype',
    sort: 'asc',
    width: 150
  },
  {
    field: 'solution',
    label: 'solution',
    sort: 'asc',
    width: 150
  },
  {
    field: 'comments',
    label: 'comments',
    sort: 'asc',
    width: 150
  },
  {
    field: 'asterixUniqueID',
    label: 'asterixUniqueID',
    sort: 'asc',
    width: 150
  },
  {
    field: 'solution',
    label: 'solution',
    sort: 'asc',
    width: 150
  },
  {
    field: 'comments',
    label: 'comments',
    sort: 'asc',
    width: 150
  },
  {
    field: 'distributerID',
    label: 'distributerID',
    sort: 'asc',
    width: 150
  },
  {
    field: 'distributerName',
    label: 'distributerName',
    sort: 'asc',
    width: 150
  },
  {
    field: 'createdAt',
    label: 'createdAt',
    sort: 'asc',
    width: 150
  },
  {
    field: 'updatedAt',
    label: 'updatedAt',
    sort: 'asc',
    width: 150
  },

];

export const LiveCallscolumns2 = [

  {
    field: 'sl.no',
    label: 'SL.NO',
    sort: 'asc',
    width: 150
  },
  {
    field: 'EmployeeName',
    label: 'Employee Name',
    sort: 'asc',
    width: 150
  }, {
    field: 'agentID',
    label: 'AgentID',
    sort: 'asc',
    width: 150
  }, {
    field: 'EmailID',
    label: 'Email ID',
    sort: 'asc',
    width: 150
  }, {
    field: 'agentCallStatus',
    label: 'Agent Call Status',
    sort: 'asc',
    width: 150
  }, {
    field: 'agentCallDispositionStatus',
    label: 'Disposition',
    sort: 'asc',
    width: 150
  },
  {
    field: 'breakStatus',
    label: 'Break Status',
    sort: 'asc',
    width: 150
  }, {
    field: 'Location',
    label: 'Location',
    sort: 'asc',
    width: 150
  }, {
    field: 'Server',
    label: 'Server',
    sort: 'asc',
    width: 150
  },
  {
    field: 'currentserver',
    label: 'Current Server',
    sort: 'asc',
    width: 150
  },
  {
    field: 'difference',
    label: 'Idle Time',
    sort: 'asc',
    width: 150
  },

];

export const ChennaiIdleAgents = [
  {
    field: 'EmployeeName',
    label: 'Name',
    sort: 'asc',
    width: 150
  }, {
    field: 'agentID',
    label: 'Agent ID',
    sort: 'asc',
    width: 150
  }, {
    field: 'EmailID',
    label: 'Email ID',
    sort: 'asc',
    width: 150
  }, {
    field: 'agentCallStatus',
    label: 'Agent status',
    sort: 'asc',
    width: 150
  }, {
    field: 'agentCallDispositionStatus',
    label: 'Disposition',
    sort: 'asc',
    width: 150
  },
  {
    field: 'breakStatus',
    label: 'Break status',
    sort: 'asc',
    width: 150
  },
  {
    field: 'difference',
    label: 'Idle Time',
    sort: 'asc',
    width: 150
  },

];

export const omrIdleAgents = [

  {
    field: 'EmployeeName',
    label: 'Name',
    sort: 'asc',
    width: 150
  }, {
    field: 'agentID',
    label: 'Agent ID',
    sort: 'asc',
    width: 150
  }, {
    field: 'EmailID',
    label: 'Email ID',
    sort: 'asc',
    width: 150
  }, {
    field: 'agentCallStatus',
    label: 'Agent status',
    sort: 'asc',
    width: 150
  }, {
    field: 'agentCallDispositionStatus',
    label: 'Disposition',
    sort: 'asc',
    width: 150
  },
  {
    field: 'breakStatus',
    label: 'Break Status',
    sort: 'asc',
    width: 150
  },
  {
    field: 'difference',
    label: 'Idle Time',
    sort: 'asc',
    width: 150
  },

];



