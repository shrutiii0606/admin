export const textfield = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "10px",
        "& fieldset": {
            borderColor: "#C5C5C5", // Normal border
        },
        "&:hover fieldset": {
            borderColor: "#000000", // Hover border
        },
        "&.Mui-focused fieldset": {
            borderColor: "#F66C69", // Focus border (or your desired color)
        },
    },
    "& .MuiInputLabel-root": {
        color: "#A6A6A6", // Default label
        "&.Mui-focused": {
            color: "#F66C69", // Focus label
        },
    },
};