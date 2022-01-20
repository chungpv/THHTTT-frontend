import { Box, Card } from '@mui/material'
import { withStyles } from '@mui/styles'
import React, { Component } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './styles'

export class SkeletonCom extends Component {
    render() {
        const { classes } = this.props

        return (
            <div className={classes.postItem}>
                <Card sx={{ display: "flex" }}>
                    <Box>
                        <Skeleton circle={true} height={48} width={48} />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }} ml={2}>
                        <Box sx={{ display: 'flex' }} className={classes.postInfo}>
                            <div>
                                <Skeleton width={75} height={20} />
                            </div>
                            <div style={{ marginLeft: 10 }}>
                                <Skeleton width={100} height={20} />
                            </div>
                            <div className={classes.time}>
                                <Skeleton width={200} height={20} />
                            </div>
                            <div className={classes.during}>
                                <Skeleton width={75} height={20} />
                            </div>
                        </Box>
                        <Box mt={1}>
                            <div className={classes.title}>
                                <Skeleton width={400} height={30} />
                            </div>
                        </Box>
                        <Box sx={{ display: 'flex' }} mt={1} mb={3}>
                            <div>
                                <Skeleton width={90} height={20} />
                            </div>
                            <div style={{ marginLeft: "30px" }}>
                                <Skeleton width={90} height={20} />
                            </div>
                            <div style={{ marginLeft: "30px" }}>
                                <Skeleton width={90} height={20} />
                            </div>
                        </Box>
                    </Box>
                </Card>
            </div>
        )
    }
}

export default withStyles(styles)(SkeletonCom)
