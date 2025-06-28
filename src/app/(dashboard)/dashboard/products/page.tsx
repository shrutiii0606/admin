'use client';

import TableComponent from "@/components/tableComponent";
import { useRouter } from 'next/navigation';

const mockProducts = [
    { id: 1, name: 'Product One', sku: '1', price: 200 },
];

export default function Products() {
    const router = useRouter();
    return (
        <TableComponent
            title="Products"
            data={mockProducts}
            searchKeys={['name', 'sku']}
            columns={[
                { label: 'Name', key: 'name' },
                { label: 'SKU', key: 'sku' },
                { label: 'Price', key: 'price' },
            ]}
            buttonLabel="Add Product"
            onButtonClick={() => router.push('/dashboard/products/add')}
        />
    );
}
