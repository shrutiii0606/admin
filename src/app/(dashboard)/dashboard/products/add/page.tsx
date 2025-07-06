"use client";

import React, { useState } from "react";
import { TextField } from "@/components/textfield";
import { Button } from "@/components/button";
import { Checkbox, FormControlLabel, Typography, Box } from "@mui/material";
import { CreateProduct, CreateProductDetails } from "@/models/product/product.model";

interface FormData extends Omit<CreateProduct, 'details'> {
    details: CreateProductDetails;
}

export default function AddProduct() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        sku: "",
        isPrimary: false,
        price: "",
        details: {
            shortDescription: "",
            longDescription: "",
            categories: "",
        },
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (field: keyof Omit<FormData, 'details'>, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
    };

    const handleDetailsChange = (field: keyof CreateProductDetails, value: string) => {
        setFormData(prev => ({
            ...prev,
            details: { ...prev.details, [field]: value }
        }));
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = "Product name is required";
        if (!formData.sku.trim()) newErrors.sku = "SKU is required";
        if (!formData.price.trim()) {
            newErrors.price = "Price is required";
        } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
            newErrors.price = "Price must be a valid positive number";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);

        try {
            console.log("Form Data:", formData);
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert("Product added successfully!");
            setFormData({
                name: "",
                sku: "",
                isPrimary: false,
                price: "",
                details: {
                    shortDescription: "",
                    longDescription: "",
                    categories: "",
                },
            });
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Error adding product. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white px-4 md:px-10 py-10">
            <div className="max-w-5xl w-full">
                <h1 className="text-3xl font-bold text-gray-900 mb-10">Add New Product</h1>

                <form onSubmit={handleSubmit} className="space-y-12">
                    {/* Section: Basic Info */}
                    <div className="border border-gray-200 rounded-xl p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Basic Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TextField
                                label="Product Name *"
                                value={formData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                                error={!!errors.name}
                                helperText={errors.name}
                                placeholder="Enter product name"
                                fullWidth
                            />
                            <TextField
                                label="SKU *"
                                value={formData.sku}
                                onChange={(e) => handleInputChange('sku', e.target.value)}
                                error={!!errors.sku}
                                helperText={errors.sku}
                                placeholder="Enter SKU"
                                fullWidth
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <TextField
                                label="Price *"
                                value={formData.price}
                                onChange={(e) => handleInputChange('price', e.target.value)}
                                error={!!errors.price}
                                helperText={errors.price}
                                placeholder="0.00"
                                type="number"
                                inputProps={{ min: 0, step: 0.01 }}
                                fullWidth
                            />
                            <div className="flex items-center">
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={formData.isPrimary}
                                            onChange={(e) => handleInputChange('isPrimary', e.target.checked)}
                                            sx={{
                                                color: "#A6A6A6",
                                                '&.Mui-checked': {
                                                    color: "#F66C69",
                                                },
                                            }}
                                        />
                                    }
                                    label="Primary Product"
                                    className="text-gray-700"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section: Product Details */}
                    <div className="border border-gray-200 rounded-xl p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Product Details</h2>

                        <div className="space-y-6">
                            <div>
                                <TextField
                                    label="Short Description"
                                    value={formData.details.shortDescription}
                                    onChange={(e) => handleDetailsChange('shortDescription', e.target.value)}
                                    placeholder="Brief product description"
                                    multiline
                                    rows={2}
                                    fullWidth
                                />
                            </div>

                            <div>
                                <TextField
                                    label="Long Description"
                                    value={formData.details.longDescription}
                                    onChange={(e) => handleDetailsChange('longDescription', e.target.value)}
                                    placeholder="Detailed product description"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    error={!!errors.longDescription}
                                    helperText={errors.longDescription}
                                />
                            </div>

                            <div>
                                <TextField
                                    label="Categories"
                                    value={formData.details.categories}
                                    onChange={(e) => handleDetailsChange('categories', e.target.value)}
                                    placeholder="Product categories (comma separated)"
                                    fullWidth
                                />
                            </div>
                        </div>

                    </div>

                    {/* Section: Actions */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            size="lg"
                            className="w-full md:w-1/2"
                        >
                            {isSubmitting ? "Adding Product..." : "Add Product"}
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            onClick={() => {
                                setFormData({
                                    name: "",
                                    sku: "",
                                    isPrimary: false,
                                    price: "",
                                    details: {
                                        shortDescription: "",
                                        longDescription: "",
                                        categories: "",
                                    },
                                });
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
