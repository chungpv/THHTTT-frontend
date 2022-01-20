import { Avatar, Badge, Box, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MuiAppBar from '@mui/material/AppBar'
import React, { Component } from 'react'
import { stylesAppBar } from './styles'
import { styled } from '@mui/system'
import { bindActionCreators, compose } from 'redux'
import { withStyles } from '@mui/styles'
import { connect } from 'react-redux'
import { styles } from './styles'
import LinkUi from '@mui/material/Link'
import * as authActions from '../../actions/auth'
import * as postActions from '../../actions/post'


export class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorElNav: false,
            anchorElUser: false
        }
    }

    handleOpenUserMenu = () => {
        this.setState({
            anchorElUser: true
        })
    }

    handleCloseUserMenu = () => {
        this.setState({
            anchorElUser: false
        })
    }

    stringToColor = name => {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < name.length; i += 1) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.substr(-2);
        }

        return color;
    }

    stringAvatar = name => {
        return {
            sx: {
                bgcolor: this.stringToColor(name),
                width: 42,
                height: 42
            },
            children: `${name.substring(0, 2).toUpperCase()}`,
        }
    }
    handleCloseNavMenu = () => {
        this.setState({
            anchorElNav: false
        })
    }
    onLogout = () => {
        this.handleCloseNavMenu()
        const { onAuthActions } = this.props
        const { logout } = onAuthActions
        logout()
    }

    render() {
        const { classes, auth, open, toggleDrawer, drawerWidth } = this.props
        const { anchorElUser } = this.state
        const { isAuth } = auth
        const AppBar = styled(
            MuiAppBar,
            { shouldForwardProp: prop => prop !== 'open' && prop !== 'drawerWidth' }
        )(stylesAppBar)

        let displayInfoAuth = null
        const username = auth ? auth.username : "example"
        if (isAuth) {
            displayInfoAuth = (
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="User Options">
                        <IconButton onClick={this.handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar
                                alt={username}
                                {...this.stringAvatar(username)}
                            />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px', top: "-5px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={this.handleCloseUserMenu}
                    >
                        <MenuItem>
                            <Typography textAlign="center">
                                <LinkUi href={`/users/${username}`}
                                    className={classes.profileLink}
                                >Profile</LinkUi>
                            </Typography>
                        </MenuItem>
                        {
                            auth.role !== "admin" ? null : (
                                <MenuItem>
                                    <Typography textAlign="center">
                                        <LinkUi href={`/dashboard`}
                                            className={classes.profileLink}
                                        >
                                            Dashboard
                                        </LinkUi>
                                    </Typography>
                                </MenuItem>
                            )
                        }
                        <MenuItem>
                            <Typography textAlign="center" onClick={this.onLogout}>
                                Logout
                            </Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            )
        }
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
                    {displayInfoAuth}
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.Auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthActions: bindActionCreators(authActions, dispatch),
        onPostActions: bindActionCreators(postActions, dispatch)
    }
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Navbar)
