'use client';

import TableComponent from "@/components/tableComponent";

const mockRetailers = [
    { id: 1, name: 'Retailer One', email: 'one@example.com', city: 'New York' },
    { id: 2, name: 'Retailer Two', email: 'two@example.com', city: 'Los Angeles' },
    { id: 3, name: 'Retailer Three', email: 'three@example.com', city: 'Chicago' },
];

export default function Retailers() {
    return (
        <TableComponent
            title="Retailers"
            data={mockRetailers}
            searchKeys={['name', 'email', 'city']}
            columns={[
                { label: 'Name', key: 'name' },
                { label: 'Email', key: 'email' },
                { label: 'City', key: 'city' },
            ]}
            buttonLabel="Add Retailer"
            onButtonClick={() => alert("Add Retailer Clicked")}
        />
    );
}
