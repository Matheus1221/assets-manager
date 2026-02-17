import { useEffect } from "react";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    TextField,
    Button,
    InputLabel,
    MenuItem,
    FormControl,
    Select
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { assetSchema, type AssetFormData } from '../schemas/assets';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import type Asset from "../types/Asset";

// Matheus Felix... teste de Vaga Dsenvolvedor FullStack

interface Props {
    onSubmit: (asset: AssetFormData) => void;
    editing: Asset | null;
    setEditing: (asset: Asset | null) => void;
}

export const categoryCopies = {
    computer: "Computador",
    notebook: "Notebook",
    monitor: "Monitor",
    network: "Rede",
    furniture: "Mobiliário",
    peripheral: "Periférico",
    other: "Outro"
};

export const statusCopies = {
    available: "Disponível",
    in_use: "Em uso",
    maintenance: "Em manutenção",
    disposed: "Descartado"
};

export function AssetForm({ onSubmit, editing, setEditing }: Props) {

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<AssetFormData>({
        resolver: zodResolver(assetSchema),
        defaultValues: {
            name: '',
            serialNumber: '',
            category: '',
            status: '',
            acquisitionDate: null
        }
    });

    useEffect(() => {
        if (editing) {
            reset({
                name: editing.name || '',
                serialNumber: editing.serialNumber || '',
                category: editing.category || '',
                status: editing.status || '',
                acquisitionDate: editing.acquisitionDate ?? null
            });
        } else {
            reset({
                name: '',
                serialNumber: '',
                category: '',
                status: '',
                acquisitionDate: null
            });
        }
    }, [editing, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <Controller
                name="name"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Nome"
                        fullWidth
                        margin="normal"
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                )}
            />

            {/* Serial */}
            <Controller
                name="serialNumber"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Serial Number"
                        fullWidth
                        margin="normal"
                        error={!!errors.serialNumber}
                        helperText={errors.serialNumber?.message}
                    />
                )}
            />

            <Controller
                name="category"
                control={control}
                render={({ field }) => (
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Categoria</InputLabel>
                        <Select
                            {...field}
                            label="Categoria"
                            value={field.value || ''}
                            onChange={(event) => field.onChange(event.target.value)}
                            error={!!errors.category}
                        >
                            {Object.entries(categoryCopies).map(([value, label]) => (
                                <MenuItem key={value} value={value}>
                                    {label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            />

            <Controller
                name="status"
                control={control}
                render={({ field }) => (
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Status</InputLabel>
                        <Select
                            {...field}
                            label="Status"
                            value={field.value || ''}
                            onChange={(event) => field.onChange(event.target.value)}
                            error={!!errors.status}
                        >
                            {Object.entries(statusCopies).map(([value, label]) => (
                                <MenuItem key={value} value={value}>
                                    {label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            />

            {/* Data */}
            <Controller
                name="acquisitionDate"
                control={control}
                render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Data de aquisição"
                            value={field.value ? dayjs(field.value) : null}
                            onChange={(date) =>
                                field.onChange(date ? date.toISOString() : null)
                            }
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    margin: 'normal'
                                }
                            }}
                        />
                    </LocalizationProvider>
                )}
            />

            {/* Botões */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 2 }}>
                <Button variant="contained" type="submit">
                    {editing ? 'Atualizar' : 'Cadastrar'}
                </Button>

                {editing && (
                    <Button
                        variant="outlined"
                        onClick={() => setEditing(null)}
                    >
                        Cancelar
                    </Button>
                )}
            </Box>

        </form>
    );
}
