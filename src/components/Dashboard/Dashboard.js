import { Box, Container, CssBaseline, Grid, Link, Toolbar, Typography } from '@mui/material'
import { withStyles } from '@mui/styles'
import React, { Component } from 'react'
import { styles } from './styles'
import Navbar from './Navbar'
import Drawer from './Drawer'


export class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true
        }
    }

    toggleDrawer = () => {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        const { children } = this.props
        const { open } = this.state
        const drawerWidth = 240

        return (
            <div>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <Navbar open={open} drawerWidth={drawerWidth} toggleDrawer={this.toggleDrawer} />
                    <Drawer open={open} drawerWidth={drawerWidth} toggleDrawer={this.toggleDrawer} />
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Toolbar />
                        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                            <Grid container spacing={3} sx={{ml: 2}}>
                                {children}
                            </Grid>
                            <Typography sx={{ pt: 4, mt: 8, mb: 4 }} variant="body2" color="text.secondary" align="center">
                                {'Copyright © '}
                                <Link color="inherit" href="https://github.com/">
                                    My Team
                                </Link>
                                {' '}
                                {new Date().getFullYear()}
                                {'.'}
                            </Typography>
                        </Container>
                    </Box>
                </Box>
            </div>
        )
    }
}

export default withStyles(styles)(Dashboard)
