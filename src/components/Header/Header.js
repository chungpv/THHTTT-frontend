import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import React, { Component } from 'react'
import { withStyles } from '@mui/styles'
import styles from './styles'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import * as postActions from '../../actions/post'
import { Link } from 'react-router-dom'
import LinkUi from '@mui/material/Link'
import LoginIcon from '@mui/icons-material/Login'
import * as authActions from '../../actions/auth'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import CreateIcon from '@mui/icons-material/Create';


const pages = ['Products', 'Pricing', 'Blog']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

export class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorElNav: false,
            anchorElUser: false,
            anchorElPost: false
        }
    }

    componentWillMount() {
        const { onAuthActions } = this.props
        const { fetchAuth } = onAuthActions
        fetchAuth()
    }

    handleOpenNavMenu = () => {
        this.setState({
            anchorElNav: true
        })
    }

    handleOpenUserMenu = () => {
        this.setState({
            anchorElUser: true
        })
    }

    handleOpenPostMenu = () => {
        this.setState({
            anchorElPost: true
        })
    }

    handleCloseNavMenu = () => {
        this.setState({
            anchorElNav: false
        })
    }

    handleCloseUserMenu = () => {
        this.setState({
            anchorElUser: false
        })
    }

    handleClosePostMenu = () => {
        this.setState({
            anchorElPost: false
        })
    }

    onSearch = event => {
        const keyword = event.target.value.trim().toLowerCase()
        const { onPostActions } = this.props
        const { filterPosts } = onPostActions
        filterPosts(keyword)
    }

    onLogout = () => {
        this.handleCloseNavMenu()
        const { onAuthActions } = this.props
        const { logout } = onAuthActions
        logout()
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

    render() {
        const { anchorElNav, anchorElUser, anchorElPost } = this.state
        const { classes, auth } = this.props
        const { isAuth } = auth
        let displayInfoAuth = null
        let displayWritePost = null
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
                        sx={{ mt: '45px', top: "-90px" }}
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
            displayWritePost = (
                <Box sx={{ flexGrow: 0, ml: 10, mr: 5 }}>
                    <Tooltip title="Post Options">
                        <IconButton onClick={this.handleOpenPostMenu} sx={{ p: 0 }}>
                            <DriveFileRenameOutlineIcon sx={{ color: "white" }} />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px', top: "-90px", left: "-50px" }}
                        id="menu-appbar-post"
                        anchorEl={anchorElPost}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElPost)}
                        onClose={this.handleClosePostMenu}
                    >
                        <MenuItem>
                            <Typography textAlign="center">
                                <LinkUi href={`/posts/new`}
                                    className={classes.writePost}
                                >
                                    <CreateIcon color="inherit" />
                                    <span>&nbsp;Write Post</span>
                                </LinkUi>
                            </Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            )
        } else {
            displayInfoAuth = (
                <Box mr={10}>
                    <LinkUi
                        className={classes.login}
                        href="/auth/login"
                    >
                        <LoginIcon />
                        <span>Login/Signup</span>
                    </LinkUi>
                </Box>
            )
        }

        return (
            <AppBar position="fixed" sx={{ top: "0", left: "0" }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            <LinkUi href="/">
                                <img src='/assets/images/logo.png' style={{ width: "3rem" }} alt='Logo' />
                            </LinkUi>
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={this.handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                        >
                            <img src='/assets/images/logo.png' style={{ width: "4rem" }} alt='Logo' />
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
                        <div className={classes.search}>
                            <div className={classes.searchIconWrapper}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                className={classes.inputBase}
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={this.onSearch}
                            />
                        </div>
                        {displayWritePost}
                        {displayInfoAuth}
                    </Toolbar>
                </Container>
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

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)

export default compose(withStyles(styles), withConnect)(Header)
