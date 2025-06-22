import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const mockRetailers = [
    { id: 1, name: "Retailer One", email: "one@example.com", city: "New York" },
    { id: 2, name: "Retailer Two", email: "two@example.com", city: "Los Angeles" },
    { id: 3, name: "Retailer Three", email: "three@example.com", city: "Chicago" },
];

export default function RetailersTable() {
    const [searchText, setSearchText] = useState("");
    const [filteredRetailers, setFilteredRetailers] = useState(mockRetailers);

    useEffect(() => {
        const filtered = mockRetailers.filter(
            (retailer) =>
                retailer.name.toLowerCase().includes(searchText.toLowerCase()) ||
                retailer.email.toLowerCase().includes(searchText.toLowerCase()) ||
                retailer.city.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredRetailers(filtered);
    }, [searchText]);

    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                Retailers
            </Typography>

            <TextField
                variant="outlined"
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                sx={{
                    "& .MuiOutlinedInput-root": {
                        borderRadius: "6px",
                        "& fieldset": {
                            borderColor: "#C5C5C5",
                        },
                        "&:hover fieldset": {
                            borderColor: "#000000",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#000000",
                        },
                    },
                    width: "350px",
                    mb: 4,
                }}
            />

            <TableContainer
                component={Paper}
                elevation={3}
                sx={{
                    borderRadius: 2,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    overflow: "hidden",
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow
                            sx={{
                                backgroundColor: "#A6A6A6",
                            }}
                        >
                            <TableCell
                                sx={{ color: "white", fontWeight: "bold", fontSize: "1rem", padding: "12px" }}
                            >
                                Name
                            </TableCell>
                            <TableCell
                                sx={{ color: "white", fontWeight: "bold", fontSize: "1rem", padding: "12px" }}
                            >
                                Email
                            </TableCell>
                            <TableCell
                                sx={{ color: "white", fontWeight: "bold", fontSize: "1rem", padding: "12px" }}
                            >
                                City
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRetailers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} align="center" sx={{ py: 4, fontStyle: "italic" }}>
                                    No Retailers Found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredRetailers.map((retailer, idx) => (
                                <TableRow
                                    key={retailer.id}
                                    sx={{
                                        backgroundColor: idx % 2 === 0 ? "#fff" : "#f9f9f9", // zebra striping
                                        "&:hover": {
                                            backgroundColor: "#f0f0f0",
                                            cursor: "pointer",
                                        },
                                    }}
                                >
                                    <TableCell sx={{ padding: "12px" }}>{retailer.name}</TableCell>
                                    <TableCell sx={{ padding: "12px" }}>{retailer.email}</TableCell>
                                    <TableCell sx={{ padding: "12px" }}>{retailer.city}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
