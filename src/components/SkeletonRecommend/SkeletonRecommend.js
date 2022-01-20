import { Box, Grid } from '@mui/material'
import React, { Component } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { withStyles } from '@mui/styles'
import styles from './styles'


export class SkeletonRecommend extends Component {
    render() {
        const { classes } = this.props

        return (
            <Grid item xs={2.5} className={classes.boxRecommend}>
                <Box>
                    <Box>
                        <div>
                            <Skeleton height={45} width={200} />
                        </div>
                        <div>
                            <Skeleton height={20} width={100} />
                        </div>
                        <div className={classes.during}>
                            <Skeleton height={15} width={70} />
                        </div>
                        <div className={classes.time}>
                            <Skeleton height={20} width={200} />
                        </div>
                    </Box>
                </Box>
            </Grid>
        )
    }
}

export default withStyles(styles)(SkeletonRecommend)
