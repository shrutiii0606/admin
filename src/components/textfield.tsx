"use client";

import { TextField as MuiTextField, TextFieldProps } from "@mui/material";
import { colors } from "@/utils/constants";

interface CustomTextFieldProps extends Omit<TextFieldProps, 'variant'> {
    variant?: 'outlined' | 'filled' | 'standard';
}

export function TextField({ sx, ...props }: CustomTextFieldProps) {
    return (
        <MuiTextField
            fullWidth
            variant="outlined"
            sx={{
                "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    "& fieldset": {
                        borderColor: "#C5C5C5",
                    },
                    "&:hover fieldset": {
                        borderColor: "#000000",
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: colors.primary,
                    },
                },
                "& .MuiInputLabel-root": {
                    color: "#A6A6A6",
                    "&.Mui-focused": {
                        color: colors.primary,
                    },
                },
                ...sx,
            }}
            {...props}
        />
    );
}