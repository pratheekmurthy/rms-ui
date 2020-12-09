import { DataGrid } from '@material-ui/data-grid';
import React, { useState } from 'react';
import { orderColumns } from 'src/modules/dashboard-360/utils/columns-config';

export default function Orders() {
  const [page, setPage] = useState(1);
  return (
    <DataGrid
      page={page}
      onPageChange={params => {
        setPage(params.page);
      }}
      pageSize={5}
      pagination
      columns={orderColumns}
      rows={[{ OrderNumber: 1, id: 1, CreatedType: 'abc' }]}
    />
  );
}
