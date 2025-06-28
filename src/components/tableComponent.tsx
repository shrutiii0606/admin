'use client';

import {
    Box,
    Paper,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface TableComponentProps<T> {
    title: string;
    data: T[];
    searchKeys: (keyof T)[];
    columns: { label: string; key: keyof T }[];
    buttonLabel?: string;
    onButtonClick?: () => void;
}

export default function TableComponent<T>({
                                              title,
                                              data,
                                              searchKeys,
                                              columns,
                                              buttonLabel,
                                              onButtonClick,
                                          }: TableComponentProps<T>) {
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState<T[]>(data);

    useEffect(() => {
        const filtered = data.filter((item) =>
            searchKeys.some((key) =>
                String(item[key]).toLowerCase().includes(searchText.toLowerCase())
            )
        );
        setFilteredData(filtered);
    }, [searchText, data, searchKeys]);

    const handleClearSearch = () => {
        setSearchText('');
    };

    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#1a1a1a' }}>
                {title}
            </Typography>

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={4}
                gap={2}
                sx={{
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'stretch', sm: 'center' }
                }}
            >
                <TextField
                    variant="outlined"
                    placeholder="Search..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: '#6b7280', fontSize: '1.25rem' }} />
                            </InputAdornment>
                        ),
                        endAdornment: searchText && (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClearSearch}
                                    size="small"
                                    sx={{
                                        color: '#6b7280',
                                        '&:hover': {
                                            color: '#374151',
                                            backgroundColor: 'rgba(107, 114, 128, 0.1)'
                                        }
                                    }}
                                >
                                    <ClearIcon fontSize="small" />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        width: { xs: '100%', sm: '350px' },
                        '& .MuiOutlinedInput-root': {
                            height: '48px',
                            borderRadius: '12px',
                            backgroundColor: '#fafafa',
                            transition: 'all 0.2s ease-in-out',
                            '& fieldset': {
                                borderColor: '#e5e7eb',
                                borderWidth: '1.5px',
                            },
                            '&:hover': {
                                backgroundColor: '#ffffff',
                                '& fieldset': {
                                    borderColor: '#9ca3af',
                                },
                            },
                            '&.Mui-focused': {
                                backgroundColor: '#ffffff',
                                boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
                                '& fieldset': {
                                    borderColor: '#3b82f6',
                                    borderWidth: '2px',
                                },
                            },
                        },
                        '& .MuiInputBase-input': {
                            fontSize: '0.95rem',
                            color: '#1f2937',
                            '&::placeholder': {
                                color: '#9ca3af',
                                opacity: 1,
                            },
                        },
                    }}
                />

                {buttonLabel && onButtonClick && (
                    <Button
                        variant="contained"
                        onClick={onButtonClick}
                        sx={{
                            height: '48px',
                            borderRadius: '12px',
                            paddingX: '24px',
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            textTransform: 'none',
                            minWidth: { xs: '100%', sm: 'auto' },
                            backgroundColor: '#3b82f6',
                            boxShadow: '0 2px 4px rgba(59, 130, 246, 0.2)',
                            transition: 'all 0.2s ease-in-out',
                            '&:hover': {
                                backgroundColor: '#2563eb',
                                boxShadow: '0 3px 6px rgba(59, 130, 246, 0.25)',
                                transform: 'translateY(-1px)',
                            },
                            '&:active': {
                                transform: 'translateY(0)',
                                boxShadow: '0 1px 3px rgba(59, 130, 246, 0.15)',
                            },
                        }}
                    >
                        {buttonLabel}
                    </Button>
                )}
            </Box>

            <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                    borderRadius: '16px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
                    overflow: 'hidden',
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow sx={{
                            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                            borderBottom: '2px solid #e5e7eb'
                        }}>
                            {columns.map((col) => (
                                <TableCell
                                    key={String(col.key)}
                                    sx={{
                                        color: '#374151',
                                        fontWeight: 700,
                                        fontSize: '0.875rem',
                                        padding: '16px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                    }}
                                >
                                    {col.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    align="center"
                                    sx={{
                                        py: 6,
                                        fontStyle: 'italic',
                                        color: '#6b7280',
                                        fontSize: '1rem'
                                    }}
                                >
                                    No Results Found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredData.map((row, idx) => (
                                <TableRow
                                    key={idx}
                                    sx={{
                                        backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fafafa',
                                        borderBottom: '1px solid #f3f4f6',
                                        transition: 'all 0.15s ease-in-out',
                                        '&:hover': {
                                            backgroundColor: '#f0f9ff',
                                            cursor: 'pointer',
                                            transform: 'translateX(2px)',
                                        },
                                        '&:last-child': {
                                            borderBottom: 'none',
                                        },
                                    }}
                                >
                                    {columns.map((col) => (
                                        <TableCell
                                            key={String(col.key)}
                                            sx={{
                                                padding: '16px',
                                                color: '#1f2937',
                                                fontSize: '0.95rem',
                                            }}
                                        >
                                            {String(row[col.key])}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}