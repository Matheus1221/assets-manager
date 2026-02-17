import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import type Asset from '../types/Asset';
import { categoryCopies, statusCopies } from "../components/AssetForm";
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import EditNoteIcon from '@mui/icons-material/EditNote';

import { Box } from '@mui/material';

interface Props {
  assets: Asset[];
  onDelete: (id: number) => void;
  onEdit: (asset: Asset) => void;
}

export default function AssetGrid({ assets, onDelete, onEdit }: Props) {

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 120 },

    { field: 'name', headerName: 'Nome', width: 120 },

    { field: 'serialNumber', headerName: 'Serial', width: 120 },

    {
      field: 'category', headerName: 'Categoria', width: 120, valueFormatter: (params) => categoryCopies[params!] || params
    },

    { field: 'status', headerName: 'Status', width: 120, valueFormatter: (params) => statusCopies[params!] || params },

    { field: 'acquisitionDate', headerName: 'Data', width: 120 },
    {
      field: 'actions',
      headerName: 'Ações',
      renderCell: (params) => (
        <>
          <EditNoteIcon
            onClick={() => onEdit(params.row)}
          />
          <DeleteForeverTwoToneIcon
            onClick={() => onDelete(params.row.id)}
          />
        </>
      )
    }
  ];

  return (
    <Box sx={{ height: 400, width: '100%', }}>
      <DataGrid
        sx={{ backgroundColor: "transparent" }}
        rows={assets}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
