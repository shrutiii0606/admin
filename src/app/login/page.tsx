"use client";

import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {colors} from "@/utils/constants";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);
  return (
    <div className="flex h-screen w-screen bg-[#f0f0f0]">
      <div className="flex-1 bg-[url('/logo.png')] bg-contain bg-center bg-no-repeat flex justify-center items-center p-8 overflow-hidden bg-[#F3DFDB]"></div>
      <div className="flex-1 flex justify-center items-center p-8  ">
        <div className="w-full max-w-sm flex flex-col gap-6">
          <h1 className="text-2xl font-semibold text-center text-black pt-2">
            LOGIN
          </h1>
          <TextField
            fullWidth
            label="Email or Employee ID"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                "& fieldset": {
                  borderColor: "#C5C5C5", // Normal border
                },
                "&:hover fieldset": {
                  borderColor: "#000000", // Hover border
                },
                "&.Mui-focused fieldset": {
                  borderColor: colors.primary, // Focus border
                },
              },
              "& .MuiInputLabel-root": {
                color: "#A6A6A6", // Default label
                "&.Mui-focused": {
                  color:colors.primary, // Focus label
                },
              },
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
             sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                "& fieldset": {
                  borderColor: "#C5C5C5", // Normal border
                },
                "&:hover fieldset": {
                  borderColor: "#000000", // Hover border
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#F66C69", // Focus border
                },
              },
              "& .MuiInputLabel-root": {
                color: "#A6A6A6", // Default label
                "&.Mui-focused": {
                  color: "#F66C69", // Focus label
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <button className="bg-[rgba(246,108,105,0.8)] hover:bg-[rgba(246,108,105,0.9)] text-white text-xl font-semibold py-4 px-4 rounded-lg mt-2">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
