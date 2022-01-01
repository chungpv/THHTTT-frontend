import { Box } from '@mui/material'
import { withStyles } from '@mui/styles'
import React, { Component } from 'react'
import PostsList from '../PostsList/PostsList'
import styles from './styles'

export class Home extends Component {
    render() {
        const { classes } = this.props

        return (
            <div className={classes.home}>
                <Box
                    className={classes.banner}
                >
                </Box>
                <PostsList />
            </div>
        )
    }
}

export default withStyles(styles)(Home)

