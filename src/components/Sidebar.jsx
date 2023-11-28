import {Drawer, List, ListItem, ListItemIcon, Typography} from '@mui/material';
import {Link, NavLink, useLocation} from 'react-router-dom';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {useDispatch} from 'react-redux';
import {logOut} from '../store/auth-reducer';


const CustomNavLink = ({to, label, icon}) => {
    const {pathname} = useLocation();

    const activeLinkStyle = {
        backgroundColor: '#e0e0e0',
        color: '#7E59EC'
    };

    return (
        <NavLink to={to} style={{textDecoration: 'none', color: '#000', textTransform: 'uppercase'}}>
            <ListItem style={{...(pathname === to ? activeLinkStyle : {})}}>
                {/* <ListItemIcon sx={{color: '#000'}} >{icon}</ListItemIcon> */}
                <Typography variant="body1">{label}</Typography>
            </ListItem>
        </NavLink>
    );
};

const Sidebar = () => {
    const dispatch = useDispatch()

    return (
        <Drawer
            anchor="left"
            variant='permanent'
            open={true}
            PaperProps={{
                sx: {width: "200px", paddingTop: '10px'},
            }}
        >
            <List component={'nav'}>
                <CustomNavLink to="/" label="головна" icon={<HomeOutlinedIcon />} />
                <CustomNavLink to="/results" label="фінанси" icon={<AccountBalanceWalletOutlinedIcon />} />
                <CustomNavLink to="/instructions" label="інструкції" icon={<VisibilityOutlinedIcon />} />
                <CustomNavLink to="/about" label="інфо" icon={<InfoOutlinedIcon />} />
                <Link
                    style={{textDecoration: 'none'}}
                >
                    <ListItem
                        style={{
                            backgroundColor: '#e0e0e0',
                            color: '#7047EA',
                            marginTop: '100px',
                            textDecoration: 'none',
                            textTransform: 'uppercase'
                        }}
                        onClick={() => dispatch(logOut())}
                    >
                        {/* <ListItemIcon sx={{color: '#000'}} >
                            <ExitToAppIcon/>
                        </ListItemIcon> */}
                        <Typography variant="body1">вихід</Typography>
                    </ListItem>
                </Link>
            </List>
        </Drawer>
    );
};

export default Sidebar;