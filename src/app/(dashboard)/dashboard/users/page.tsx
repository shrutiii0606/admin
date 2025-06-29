'use client';

import TableComponent from "@/components/tableComponent";
import { useRouter } from 'next/navigation';

const mockUsers = [
    { id: 1, name: 'User1'},
];

export default function Users() {
    const router = useRouter();
    return (
        <TableComponent
            title="Users"
            data={mockUsers}
            searchKeys={['name']}
            columns={[
                { label: 'Name', key: 'name' },
            ]}
            buttonLabel="Add User"
            onButtonClick={() => router.push('/dashboard/users/add')}
        />
    );
}
