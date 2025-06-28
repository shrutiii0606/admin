'use client';

import { useRouter } from 'next/navigation';
import { menuItems } from "@/utils/constants";
import CardComponent from "@/components/cardComponent";
import Box from '@mui/material/Box';

export default function Dashboard() {
    const router = useRouter();

    return (
        <Box
            display="grid"
            gap={5}
            mt={2}
            px={2} // optional padding
            sx={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                maxWidth: '1400px',
                margin: '0 auto',
            }}
        >
            {menuItems
                .filter((item) => item.key !== 'home') // exclude Home from cards
                .map((item) => (
                    <CardComponent
                        key={item.key}
                        title={item.label}
                        icon={<item.icon />}
                        onClick={() => router.push(item.route)}
                    />
                ))}
        </Box>
    );
}
