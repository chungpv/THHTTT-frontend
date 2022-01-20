import { Avatar, Box, Card } from '@mui/material'
import React, { Component } from 'react'
import styles from './styles'
import { withStyles } from '@mui/styles'
import readingTime from 'reading-time'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import LinkUi from '@mui/material/Link'

export class PostItemProfile extends Component {
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
                width: 48,
                height: 48
            },
            children: `${name.substring(0, 2).toUpperCase()}`,
        }
    }

    onClickToTag = tagId => {
        const { history } = this.props
        history.push(`/tags/${tagId}`)
    }

    render() {
        const { classes, post, userProfile } = this.props
        const content = post ? post.content.split("\n").join("\n\n") : ""
        const displayTag = post.tags.map((tag, index) => (
            <LinkUi
                key={index}
                href={`/tags/${tag._id}`}
                sx={{ ml: 4, textDecoration: "none" }}
            >
                # {tag.content}
            </LinkUi>
        ))

        return (
            <div className={classes.postItem}>
                <Card sx={{ display: "flex" }}>
                    <Box>
                        <Avatar
                            alt={userProfile ? userProfile.username : ""}
                            {...this.stringAvatar(userProfile ? userProfile.username : "")}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }} ml={2}>
                        <Box sx={{ display: 'flex' }} className={classes.postInfo}>
                            <LinkUi className={classes.username} href={`/users/${userProfile ? userProfile.username : ""}`}>
                                {`@${userProfile ? userProfile.username : ""}`}
                            </LinkUi>
                            <div style={{ marginLeft: 10 }} className={classes.email}>
                                {`${userProfile ? userProfile.email : ""}`}
                            </div>
                            <div className={classes.time}>
                                {`Published ${post ? (new Date(post.createdAt * 1000)).toLocaleString() : ""}`}
                            </div>
                            <div className={classes.during}>
                                {`${Math.round(readingTime(content).minutes)} min`}
                                <span> read</span>
                            </div>
                        </Box>
                        <Box mt={1}>
                            <LinkUi className={classes.title} href={`/posts/${post ? post._id : ""}`}>
                                {post ? post.title : ""}
                            </LinkUi>
                        </Box>
                        <Box sx={{ display: 'flex' }} mt={1} mb={3}>
                            {displayTag}
                        </Box>
                    </Box>
                </Card>
            </div>
        )
    }
}

export default compose(withRouter, withStyles(styles))(PostItemProfile)
