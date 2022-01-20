import { Box, Grid } from '@mui/material'
import { withStyles } from '@mui/styles'
import React, { Component } from 'react'
import readingTime from 'reading-time'
import styles from './styles'
import LinkUi from '@mui/material/Link'

export class PostItemRecommend extends Component {
    render() {
        const { post, author, classes } = this.props
        const content = post ? post.content.split("\n").join("\n\n") : ""
        const title = post ? (post.title.length > 60 ? `${post.title.substring(0, 50)}...` : post.title) : ""
        return (
            <Grid item xs={2.5} className={classes.boxRecommend}>
                <Box>
                    <Box style={{ display: "flex", flexDirection: "column", marginRight: "10px" }}>
                        <div>
                            <LinkUi className={classes.title} href={`/posts/${post ? post._id : ""}`}>
                                {title}
                            </LinkUi>
                        </div>
                        <div>
                            <LinkUi className={classes.username} href={`/users/${author ? author.username : ""}`}>
                                {`@${author ? author.username : ""}`}
                            </LinkUi>
                        </div>
                        <div className={classes.during}>
                            {`${Math.round(readingTime(content).minutes)} min`}
                            <span> read</span>
                        </div>
                        <div className={classes.time}>
                            {post ? (new Date(post.createdAt)).toLocaleString() : ""}
                        </div>
                    </Box>
                </Box>
            </Grid>
        )
    }
}

export default withStyles(styles)(PostItemRecommend)
