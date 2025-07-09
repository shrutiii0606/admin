'use client';

import { useState } from 'react';
import { format, subDays, addDays } from 'date-fns';
import {
    Box,
    Typography,
    IconButton,
    TextField,
    Paper,
    Stack,
    Divider,
    Chip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import TableComponent from '@/components/tableComponent';

const mockAttendanceData = [
    { id: 1, name: 'Alice', status: 'Present' },
    { id: 2, name: 'Bob', status: 'Absent' },
    { id: 3, name: 'Charlie', status: 'Present' },
];

export default function Attendance() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handlePrevious = () => setSelectedDate(prev => subDays(prev, 1));
    const handleNext = () => setSelectedDate(prev => addDays(prev, 1));
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(new Date(e.target.value));
    };

    // Add formatted data with icons
    const formattedData = mockAttendanceData.map((entry) => ({
        ...entry,
        status: (
            <Chip
                label={entry.status}
                color={entry.status === 'Present' ? 'success' : 'error'}
                icon={entry.status === 'Present' ? <CheckCircleIcon /> : <CancelIcon />}
                variant="outlined"
                sx={{
                    fontWeight: 500,
                    px: 1,
                    py: 0.5,
                    fontSize: '0.875rem'
                }}
            />
        ),
    }));

    return (
        <Box>
            {/* Header */}
            <Paper elevation={1} sx={{
                p: 3,
                mb: 4,
                borderRadius: 4,
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    alignItems="center"
                    justifyContent="space-between"
                    gap={2}
                >
                    {/* Date Navigation */}
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <IconButton onClick={handlePrevious} color="primary">
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h6" fontWeight={600} color="text.primary">
                            {format(selectedDate, 'dd MMM yyyy')}
                        </Typography>
                        <IconButton onClick={handleNext} color="primary">
                            <ArrowForwardIcon />
                        </IconButton>
                    </Stack>

                    {/* Calendar Picker */}
                    <TextField
                        type="date"
                        size="small"
                        value={format(selectedDate, 'yyyy-MM-dd')}
                        onChange={handleDateChange}
                        sx={{
                            minWidth: 180,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                fontSize: 14,
                                backgroundColor: '#f1f5f9',
                            }
                        }}
                    />
                </Stack>
            </Paper>

            {/* Attendance Table */}
            <TableComponent
                title={`Attendance on ${format(selectedDate, 'dd MMM yyyy')}`}
                data={mockAttendanceData}
                searchKeys={['name', 'status']}
                columns={[
                    { label: 'Employee Name', key: 'name' },
                    { label: 'Status', key: 'status' },
                ]}
            />

        </Box>
    );
}
