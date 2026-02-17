import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import type Asset from '../types/Asset';
import { categoryCopies, statusCopies } from "../components/AssetForm";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { Box, IconButton } from '@mui/material';
import dayjs from 'dayjs';

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

    { field: 'category', headerName: 'Categoria', width: 120, valueFormatter: (value) => categoryCopies[value!] || value },

    { field: 'status', headerName: 'Status', width: 120, valueFormatter: (value) => statusCopies[value!] || value },

    { field: 'acquisitionDate', headerName: 'Data', width: 120, valueFormatter: (value) => value ? dayjs(value).format("DD/MM/YYYY") : null },
    {
      field: 'actions',
      headerName: 'Ações',
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" color="info" onClick={() => onEdit(params.row)}>
            <EditNoteIcon />
          </IconButton>
          <IconButton aria-label="edit" color="error" onClick={() => onDelete(params.row.id)}>
            <DeleteOutlineIcon />
          </IconButton>
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
