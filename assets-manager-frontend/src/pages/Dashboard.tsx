import { useEffect, useState } from "react";
import type Asset from "../types/Asset";
import AssetGrid from "../components/AssetGrid"
import { AssetForm } from "../components/AssetForm";
import { getAssets, deleteAsset, createAsset, updateAsset } from "../services/api";
import Snackbar, { type SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { type AssetFormData } from '../schemas/Assets';
import Box from '@mui/material/Box';

export function Dashboard() {

    const [assets, setAssets] = useState<Asset[]>([]);
    const [feedback, setFeedback] = useState<"success" | "error" | null>(null);
    const [editing, setEditing] = useState<Asset | null>(null);

    const fetchAssets = async () => {
        const response = await getAssets();
        setAssets(response.data);
    };

    useEffect(() => {
        fetchAssets();
    }, []);

    const handleDelete = async (id: number) => {
        await deleteAsset(id);
        fetchAssets();
    };

    const onSubmit = async (data: AssetFormData) => {
        try {
            if (editing?.id != null) {
                await updateAsset(editing.id, data);
            } else {
                await createAsset(data);
            }

            fetchAssets();
            setFeedback("success");
            setEditing(null);
        } catch (error) {
            setFeedback("error");
        }
    };

    const handleClose = (
        _event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }
        setFeedback(null);
    };

    return (
        <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
            <AssetForm
                onSubmit={onSubmit}
                editing={editing}
                setEditing={setEditing}
            />
            <AssetGrid
                assets={assets}
                onDelete={handleDelete}
                onEdit={setEditing}
            />
            <Snackbar open={feedback != null} autoHideDuration={3000} onClose={handleClose}>
                {feedback ? <Alert
                    onClose={handleClose}
                    severity={feedback}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {feedback == "success" ? 'Ativo criado com sucesso' : 'Erro ao criar Ativo'}
                </Alert> : <div />}
            </Snackbar>
        </Box>
    )
}