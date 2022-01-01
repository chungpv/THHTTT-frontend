import { Badge, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MuiAppBar from '@mui/material/AppBar'
import React, { Component } from 'react'
import { stylesAppBar } from './styles'
import { styled } from '@mui/system'


export class Navbar extends Component {
    render() {
        const { open, toggleDrawer, drawerWidth } = this.props

        const AppBar = styled(
            MuiAppBar,
            { shouldForwardProp: prop => prop !== 'open' && prop !== 'drawerWidth' }
        )(stylesAppBar)

        return (
            <AppBar position="absolute" open={open} drawerWidth={drawerWidth}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Dashboard
                    </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar
