import { DataGrid, type GridColDef, type GridRenderCellParams } from '@mui/x-data-grid';
import type Asset from '../types/Asset';
import { categoryCopies, statusCopies } from "./AssetForm";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

import { Box, Chip, IconButton } from '@mui/material';
import dayjs from 'dayjs';
import type { Status } from '../types/Asset';
import type { ReactElement } from 'react';

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

    {
      field: 'status', headerName: 'Status', width: 170,
      renderCell: (params: GridRenderCellParams<Asset, Status>) => {
        const statusStyle: Record<Status, { color: 'error' | 'info' | 'success' | 'warning', icon: ReactElement}> = {
          available: {
            color: "success",
            icon: <CheckCircleOutlineIcon />
          },
          disposed: {
            color: "error",
            icon: <CancelOutlinedIcon />
          },
          maintenance: {
            color: "warning",
            icon: <HourglassEmptyIcon />
          },
          in_use: {
            color: "info",
            icon: <HourglassEmptyIcon />
          }
        }
        const style = statusStyle[params.value!];

        return <Chip icon={style.icon} label={statusCopies[params.value!] || params.value} color={style.color} style={{opacity: 0.8}}/>;
      }
    },

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
