import React, { Component } from 'react'
import MuiDrawer from '@mui/material/Drawer'
import { Divider, IconButton, List, Toolbar } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import MainListItems from './MainListItems'
import SecondListItems from './SecondListItems'
import { stylesDrawer } from './styles'
import { styled } from '@mui/system'


export class Drawer extends Component {
    render() {
        const { open, toggleDrawer, drawerWidth } = this.props

        const Drawer = styled(
            MuiDrawer,
            { shouldForwardProp: prop => prop !== 'open' && prop !== 'drawerWidth' }
        )(stylesDrawer)

        return (
            <Drawer variant="permanent" open={open} drawerWidth={drawerWidth}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List>
                    <MainListItems />
                </List>
                <Divider />
                <List>
                    <SecondListItems />
                </List>
            </Drawer>
        )
    }
}

export default Drawer
