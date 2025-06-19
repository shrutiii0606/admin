"use client";
import {CssBaseline, Drawer, IconButton, Toolbar, Typography} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import {styled} from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import {useState} from "react";
import Box from '@mui/material/Box';
import {colors} from "@/utils/constants";
import CancelIcon from '@mui/icons-material/Cancel';
import List from '@mui/material/List';
import PeopleIcon from "@mui/icons-material/People";
import Link from 'next/link';


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

const menuItems = [
    {label: "Retailer", icon: <PeopleIcon/>, path: "/retailer" },
];


export default function Home() {
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position='fixed' open={open}
                    elevation={0}
                    sx={{
                        backgroundColor: colors.primary,
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
                        variant="h6"
                        noWrap
                        component="div"
                        className={`${open ? "text-left" : "text-center"} flex-grow text-[32px] font-normal`}
                    >
                        Dashboard</Typography>
                </Toolbar>

            </AppBar>
            <Drawer
                sx={{
                    flexShrink: 0,
                    width: drawerWidth,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
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
                <List className="px-4">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.path}
                            className="hover:bg-gray-100 cursor-pointer block p-4"
                            style={{
                                borderTop: `1px solid ${colors.borderDefault}`,
                                borderBottom: `1px solid ${colors.borderDefault}`,
                                color: colors.black,
                                textDecoration: 'none',
                            }}
                        >
                            <div className="flex items-center gap-4">
                                <div style={{ color: colors.black }}>{item.icon}</div>
                                <span style={{ fontWeight: 'normal', fontSize: '1rem' }}>{item.label}</span>
                            </div>
                        </Link>
                    ))}
                </List>

            </Drawer>
        </Box>
    );
}
