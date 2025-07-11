import PeopleIcon from "@mui/icons-material/People";
import HomeIcon from '@mui/icons-material/Home';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { SvgIconComponent } from "@mui/icons-material";

export const colors={
    primary:"#F66C69",
    secondary: "#F3DFDB",
    buttonBackground: "rgba(246,108,105,0.8)",
    buttonHoverBackground: "rgba(246,108,105,0.9)",
    black: "#000000",
    white: "#FFFFFF",
    background: "#f0f0f0",
    borderDefault: "#C5C5C5",
    labelDefault: "#A6A6A6",
}


export const menuItems: {
    label: string;
    icon: SvgIconComponent;
    key: string;
    route: string;
    color: string;
}[] = [
    { label: 'Retailers', icon: PeopleIcon, key: 'retailers', route: '/dashboard/retailers',color: '#1976d2'  },
    { label: 'Products', icon: StorefrontIcon, key: 'products', route: '/dashboard/products' ,color: '#388e3c' },
    {label: 'Users', icon: PeopleIcon, key: 'users', route: '/dashboard/users' ,color: '#f57c00'},
    {label: 'Attendance', icon: PeopleIcon, key: 'attendance', route: '/dashboard/attendance',color: '#d32f2f'  },

];
