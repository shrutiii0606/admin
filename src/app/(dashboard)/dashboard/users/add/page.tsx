"use client";

import { useState } from "react";
import { TextField } from "@/components/textfield";
import { Button } from "@/components/button";
import { MenuItem } from "@mui/material";

const roles = ["admin", "employee", "retailer"] as const;

interface FormData {
    name: string;
    password: string;
    email: string;
    mobile: string;
    role: string;
}

export default function AddUser() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        password: "",
        email: "",
        mobile: "",
        role: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (formData.mobile.trim().length < 10) newErrors.mobile = "Mobile number must be at least 10 digits";
        if (formData.password && formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email address";
        if (!formData.role) newErrors.role = "Role is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);

        try {
            console.log("Form Submitted:", formData);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            alert("User added successfully!");
            setFormData({ name: "", password: "", email: "", mobile: "", role: "" });
        } catch (err) {
            console.error(err);
            alert("Failed to add user.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white px-4 md:px-10 py-10">
            <div className="max-w-3xl w-full">
                <h1 className="text-3xl font-bold text-gray-900 mb-10">Add New User</h1>

                <form onSubmit={handleSubmit} className="space-y-12">
                    <div className="border border-gray-200 rounded-xl p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">User Information</h2>

                        <div className="space-y-6">
                            <div>
                            <TextField
                                label="Name *"
                                value={formData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                error={!!errors.name}
                                helperText={errors.name}
                                fullWidth
                            />
                            </div>

                            <div>
                            <TextField
                                label="Mobile *"
                                value={formData.mobile}
                                onChange={(e) => handleInputChange("mobile", e.target.value)}
                                error={!!errors.mobile}
                                helperText={errors.mobile}
                                fullWidth
                            />
                            </div>

                            <div>
                            <TextField
                                label="Email"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                error={!!errors.email}
                                helperText={errors.email}
                                fullWidth
                            />
                            </div>

                            <div>
                            <TextField
                                label="Password"
                                value={formData.password}
                                onChange={(e) => handleInputChange("password", e.target.value)}
                                error={!!errors.password}
                                helperText={errors.password}
                                type="password"
                                fullWidth
                            />
                            </div>

                            <div>
                            <TextField
                                select
                                label="Role *"
                                value={formData.role}
                                onChange={(e) => handleInputChange("role", e.target.value)}
                                error={!!errors.role}
                                helperText={errors.role}
                                fullWidth
                            >
                                {roles.map((r) => (
                                    <MenuItem key={r} value={r}>
                                        {r.charAt(0).toUpperCase() + r.slice(1)}
                                    </MenuItem>
                                ))}
                            </TextField>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            size="lg"
                            className="w-full md:w-1/2"
                        >
                            {isSubmitting ? "Adding User..." : "Add User"}
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            onClick={() => {
                                setFormData({ name: "", password: "", email: "", mobile: "", role: "" });
                                setErrors({});
                            }}
                            className="w-full md:w-1/2"
                        >
                            Reset Form
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
