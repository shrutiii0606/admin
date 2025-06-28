import {
    Card,
    CardActionArea,
    Typography,
    Box,
    useTheme,
    alpha,
} from '@mui/material';
import { ReactNode } from 'react';

interface CardComponentProps {
    title: string;
    icon?: ReactNode;
    onClick: () => void;

}

export default function CardComponent({
                                          title,
                                          icon,
                                          onClick,

                                      }: CardComponentProps) {
    const theme = useTheme();

    return (
        <Card
            sx={{
                width: 300,
                height: 180,
                borderRadius: 5,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                backgroundColor: theme.palette.background.paper,
                boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.1)}`,
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 12px 40px ${alpha(theme.palette.common.black, 0.15)}`,
                    '& .icon-container': {
                        transform: 'scale(1.05)',
                    },
                },
                '&:active': {
                    transform: 'translateY(-4px)',
                },
            }}
        >
            <CardActionArea
                onClick={onClick}
                sx={{
                    height: '100%',
                    width: '100%',
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover .MuiCardActionArea-focusHighlight': {
                        opacity: 0,
                    },
                }}
            >
                <Box
                    className="icon-container"
                    sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 28,
                        mb: 2,
                        transition: 'transform 0.3s ease',
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                    }}
                >
                    {icon}
                </Box>

                <Box sx={{ textAlign: 'center' }}>
                    <Typography
                        variant="h6"
                        fontWeight={600}
                        sx={{
                            mb: 0,
                            color: theme.palette.text.primary,
                        }}
                    >
                        {title}
                    </Typography>
                </Box>
            </CardActionArea>
        </Card>
    );
}