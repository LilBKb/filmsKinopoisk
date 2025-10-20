import { AppBar, Toolbar, IconButton, Typography, List, ListItem, ListItemButton, ListItemText, Drawer, Container, Slide, useScrollTrigger, Link, ListItemIcon, Box, Divider } from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {Link as RouterLink} from 'react-router-dom'
import { iconComponents, MOVIE_LISTS, TOP_LISTS } from '../../../constants';


interface IconProps {
    iconName: string;
}

const Icon = ({ iconName }: IconProps) => {
    const IconComponent = iconComponents[iconName as keyof typeof iconComponents];
    return IconComponent ? <IconComponent /> : null;
}

const Navbar =()=>{
    const [isOpen,setIsOpen]=useState(false);
    const handleMenuToggle = ()=>{
        setIsOpen((prev)=>!prev)
    }


    const trigger = useScrollTrigger({
        target:window
    });
    return(
        <Slide appear={false} direction='down' in={!trigger}>
            <AppBar>
                <Container>
                    <Toolbar>
                        <IconButton color='inherit' onClick={handleMenuToggle}>
                            <MenuIcon/>
                        </IconButton>
                        <Drawer open={isOpen} onClose={handleMenuToggle}>
                            <Box sx={{width:250}} onClick={handleMenuToggle}>
                                <List>
                                {TOP_LISTS.map((item) => (
                                    <Link key={item.title} component={RouterLink} to={item.url}>
                                        <ListItem key={item.title} disablePadding>
                                            <ListItemButton sx={{ textAlign: 'center' }}>
                                                <ListItemIcon>
                                                    <Icon iconName={item.icon}/>
                                                </ListItemIcon>
                                            <ListItemText primary={item.title} />
                                            </ListItemButton>
                                        </ListItem>
                                    </Link>
                                ))}
                                </List>
                                <Divider/>
                                <List>
                                    {MOVIE_LISTS.map((item)=>(
                                        <Link key={item.title} component={RouterLink} to={item.url}>
                                        <ListItem key={item.title} disablePadding>
                                            <ListItemButton sx={{ textAlign: 'center' }}>
                                                <ListItemIcon>
                                                    <Icon iconName={item.icon}/>
                                                </ListItemIcon>
                                            <ListItemText primary={item.title} />
                                            </ListItemButton>
                                        </ListItem>
                                    </Link>
                                    ))}
                                </List>
                            </Box>
                        </Drawer>
                        <Typography
                        sx={{color:'white',textDecoration:'none'}}
                        component={RouterLink}
                        variant='h4'
                        to='/'
                        >Kinopoisk</Typography>
                    </Toolbar> 
                </Container>
            
            </AppBar>
        </Slide>
        
    )
}

export default Navbar;