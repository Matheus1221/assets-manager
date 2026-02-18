import * as React from 'react';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import {
    gridFilterModelSelector,
    useGridApiContext,
    useGridSelector,
    Toolbar,
    ToolbarButton,
    QuickFilter,
    QuickFilterControl,
    QuickFilterClear,
    QuickFilterTrigger,
} from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';

type OwnerState = {
    expanded: boolean;
};

const StyledToolbarButton = styled(ToolbarButton)<{ ownerState: OwnerState }>(
    ({ theme, ownerState }) => ({
        gridArea: '1 / 1',
        width: 'min-content',
        height: 'min-content',
        zIndex: 1,
        opacity: ownerState.expanded ? 0 : 1,
        pointerEvents: ownerState.expanded ? 'none' : 'auto',
        transition: theme.transitions.create(['opacity']),
    }),
);

const StyledTextField = styled(TextField)<{
    ownerState: OwnerState;
}>(({ theme, ownerState }) => ({
    gridArea: '1 / 1',
    overflowX: 'clip',
    width: ownerState.expanded ? 260 : 'var(--trigger-width)',
    opacity: ownerState.expanded ? 1 : 0,
    transition: theme.transitions.create(['width', 'opacity']),
}));

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: '8px',
    border: `1px solid ${theme.palette.divider}`,
    padding: '4px',
    gap: '4px',
    '& .MuiButton-root': {
        border: 'none',
        borderRadius: '6px',
        padding: '6px 12px',
        textTransform: 'none',
        color: theme.palette.text.secondary,
        '&.MuiButton-contained': {
            backgroundColor: theme.palette.action.selected,
        },
    },
}));

export function AssetToolbar() {
    const apiRef = useGridApiContext();

    const onStatusChange = React.useCallback(
        (status: 'all' | 'available' | 'in_use' | 'maintenance' | 'disposed') => {
            console.log(status)
            if (status === 'all') {
                apiRef.current!.upsertFilterItem({ field: 'status', operator: 'equals', value: undefined });
            } else {
                apiRef.current!.upsertFilterItem({ field: 'status', operator: 'equals', value: status });
            }
        },
        [apiRef],
    );

    const filterModel = useGridSelector(apiRef, gridFilterModelSelector);
    const statusFilter = filterModel.items.find((item) => item.field === 'status')?.value || 'all';

    return (
        <Toolbar
            render={
                <Box
                    sx={{
                        margin: 2,
                        display: 'flex',
                        gap: 2,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                />
            }
        >
            <StyledButtonGroup>
                <Button
                    onClick={() => onStatusChange('all')}
                    variant={statusFilter === 'all' ? 'contained' : 'text'}
                    disableRipple
                >
                    Todos status
                </Button>
                <Button
                    onClick={() => onStatusChange('available')}
                    variant={statusFilter === 'available' ? 'contained' : 'text'}
                    disableRipple
                >
                    Disponível
                </Button>
                <Button
                    onClick={() => onStatusChange('in_use')}
                    variant={statusFilter === 'in_use' ? 'contained' : 'text'}
                    disableRipple
                >
                    Em uso
                </Button>
                <Button
                    onClick={() => onStatusChange('maintenance')}
                    variant={statusFilter === 'maintenance' ? 'contained' : 'text'}
                    disableRipple
                >
                    Em manutenção
                </Button>
                <Button
                    onClick={() => onStatusChange('disposed')}
                    variant={statusFilter === 'disposed' ? 'contained' : 'text'}
                    disableRipple
                >
                    Descartado
                </Button>
            </StyledButtonGroup>
            <QuickFilter style={{
                display: 'grid',
                alignItems: 'center',
                marginLeft: 'auto',
            }}>
                <QuickFilterTrigger
                    render={(triggerProps, state) => (
                        <Tooltip title="Search" enterDelay={0}>
                            <StyledToolbarButton
                                {...triggerProps}
                                ownerState={{ expanded: state.expanded }}
                                color="default"
                                aria-disabled={state.expanded}
                            >
                                <SearchIcon fontSize="small" />
                            </StyledToolbarButton>
                        </Tooltip>
                    )}
                />
                <QuickFilterControl
                    render={({ ref, ...controlProps }, state) => (
                        <StyledTextField
                            {...controlProps}
                            ownerState={{ expanded: state.expanded }}
                            inputRef={ref}
                            aria-label="Pesquisar"
                            placeholder="Pesquisar..."
                            size="small"
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon fontSize="small" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: state.value ? (
                                        <InputAdornment position="end">
                                            <QuickFilterClear
                                                edge="end"
                                                size="small"
                                                aria-label="Clear search"
                                                material={{ sx: { marginRight: -0.75 } }}
                                            >
                                                <CancelIcon fontSize="small" />
                                            </QuickFilterClear>
                                        </InputAdornment>
                                    ) : null,
                                    ...controlProps.slotProps?.input,
                                },
                                ...controlProps.slotProps,
                            }}
                        />
                    )}
                />
            </QuickFilter>
        </Toolbar >
    );
}