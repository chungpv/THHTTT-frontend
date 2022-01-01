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
import LoginIcon from '@mui/icons-material/Login'
import * as authActions from '../../actions/auth'


const pages = ['Products', 'Pricing', 'Blog']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

export class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorElNav: false,
            anchorElUser: false,
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

    onSearch = event => {
        const keyword = event.target.value.trim().toLowerCase()
        const { onPostActions } = this.props
        const { filterPosts } = onPostActions
        filterPosts(keyword)
    }

    render() {
        const { anchorElNav, anchorElUser } = this.state
        const { classes, auth } = this.props
        const { isAuth } = auth
        let displayInfoAuth = null
        if (isAuth) {
            displayInfoAuth = (
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="User Options">
                        <IconButton onClick={this.handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src="assets/images/avatar.jpeg" />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
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
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={this.handleCloseNavMenu}>
                                <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            )
        } else {
            displayInfoAuth = (
                <Box mr={10}>
                    <Link
                        className={classes.login}
                        href="/auth/login"
                    >
                        <LoginIcon />
                        <span>Login/Signup</span>
                    </Link>
                </Box>
            )
        }

        return (
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            <img src='/assets/images/logo.png' style={{ width: "4rem" }} alt='Logo' />
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
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={this.handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                <MenuItem>
                                    <Typography textAlign="center">
                                        <Link to="/auth/login">Login</Link>
                                    </Typography>
                                </MenuItem>
                                <MenuItem>
                                    <Typography textAlign="center">
                                        <Link to="/auth/sigup">Signup</Link>
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                        >
                            <img src='/assets/images/logo.png' style={{ width: "4rem" }} alt='Logo' />
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {/* {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={this.handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))} */}
                            <MenuItem>
                                <Typography textAlign="center">
                                    <Link to="/auth/login">Login</Link>
                                </Typography>
                            </MenuItem>
                            <MenuItem>
                                <Typography textAlign="center">
                                    <Link to="/auth/signup">Signup</Link>
                                </Typography>
                            </MenuItem>
                        </Box>
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
