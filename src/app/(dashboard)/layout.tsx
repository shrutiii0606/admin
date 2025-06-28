'use client';

import {useState} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import {
    CssBaseline,
    Drawer,
    IconButton,
    Toolbar,
    Typography,
    Box,
    List
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import {styled} from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CancelIcon from '@mui/icons-material/Cancel';
import {menuItems, colors} from '@/utils/constants';

const drawerWidth = 350;

interface AppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function DashboardLayout({children}: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const pathname = usePathname();
    const router = useRouter();

    return (
        <>
            <CssBaseline/>
            <AppBar position='fixed' open={open}
                    elevation={0}
                    sx={{
                        backgroundColor:colors.primary,
                        height: 90,
                        color: colors.white,
                        display: "flex",
                        justifyContent: 'center'

                    }}>
                <Toolbar className="flex justify-between items-center">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        disableRipple
                        sx={[
                            {
                                ml: 5,
                            },
                            open && {display: 'none'},
                        ]}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h4"
                        noWrap
                        component="div"
                        className={`${open ? "text-left" : "text-center"} flex-grow text-[40px] font-bold`}
                    >
                        Dashboard</Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        position: 'fixed',
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader className="flex w-full">
                    <div className="flex justify-between items-center w-full mt-5">
                        <div className="cursor-pointer pl-4 h-[35px]">
                            <img
                                src="/logo.png"
                                alt="no image"
                                className="h-[35px] w-[200px] mr-10 object-cover"
                            />
                        </div>
                        <IconButton onClick={handleDrawerClose} disableRipple>
                            <CancelIcon sx={{color: colors.primary, height: 24, width: 24}}/>
                        </IconButton>
                    </div>
                </DrawerHeader>
                <div className="h-10"/>
                <List>
                    {menuItems.map((item) => (
                        <Box
                            key={item.key}
                            onClick={() => router.push(item.route)}
                            sx={{
                                p: 2,
                                cursor: 'pointer',
                                borderBottom: `1px solid ${colors.borderDefault}`, // border on every item
                                backgroundColor: pathname === item.route ? '#f5f5f5' : 'transparent',
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                borderRadius: 0,
                                '&:hover': {
                                    backgroundColor: '#eaeaea',
                                }
                            }}
                        >
                            <item.icon />
                            <Typography>{item.label}</Typography>
                        </Box>
                    ))}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 4,
                    mt: 11,
                    minHeight: '100vh',
                    transition: 'margin 0.5s ease',
                    ...(open && { marginLeft: `${drawerWidth}px` }),
                }}
            >
                {children}
            </Box>


        </>
    )
}
