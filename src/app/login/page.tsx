import { TextField } from "@mui/material";

export default function Login() {
  return (
    <div className="flex h-screen w-screen bg-[#f0f0f0]">
      <div className="flex-1 bg-[url('/logo.png')] bg-contain bg-center bg-no-repeat flex justify-center items-center p-8 overflow-hidden bg-[#F3DFDB]"></div>
      <div className="flex-1 flex justify-center items-center p-8  ">
        <div className="w-full max-w-sm flex flex-col gap-6">
          <h2 className="text-2xl font-semibold text-center text-black pt-2">
            LOGIN
          </h2>
          <TextField
            fullWidth
            label="Email or Employee ID"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px", 
              },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
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
