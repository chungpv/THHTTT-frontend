import { Avatar, Box, Button, Container, CssBaseline, Grid, Menu, MenuItem } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { bindActionCreators, compose } from 'redux'
import * as postActions from '../../actions/post'
import Markdown from 'markdown-to-jsx'
import { withStyles } from '@mui/styles'
import styles from './styles'
import ReadingTime from 'reading-time'
import * as authActions from '../../actions/auth'


export class SinglePost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl: null,
            open: false
        }
    }

    componentWillMount() {
        const { match, onPostActions, onAuthActions } = this.props
        const { postId } = match.params
        const { fetchPost } = onPostActions
        const { fetchAuth } = onAuthActions
        fetchPost(postId)
        fetchAuth()
    }

    handleClickOptionsPost = event => {
        this.setState({
            anchorEl: event.currentTarget,
            open: true
        })
    }

    handleCloseOptionsPost = () => {
        this.setState({
            anchorEl: null,
            open: false
        })
    }

    handleDeletePost = () => {
        this.handleCloseOptionsPost()
        const { post, onPostActions } = this.props
        const { deletePost } = onPostActions
        deletePost(post ? post._id : "")
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
                width: 56,
                height: 56
            },
            children: `${name.substring(0, 2).toUpperCase()}`,
        }
    }

    render() {
        const { open, anchorEl } = this.state
        const { post, author, auth, classes } = this.props
        const content = post ? post.content.split("\n").join("\n\n") : ""
        const authorUsername = author ? author.username : "ab"
        let postOptions = null
        if (authorUsername === auth.username) {
            postOptions = (<div>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={this.handleClickOptionsPost}
                    sx={{ padding: 0 }}
                >
                    <MoreHorizIcon />
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={this.handleCloseOptionsPost}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem
                        onClick={this.handleCloseOptionsPost}
                    >
                        <Link
                            to={`/posts/${post ? post._id : ""}/edit`}
                            className={classes.editPost}
                        >
                            Edit Post
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={this.handleDeletePost}>
                        Delete Post
                    </MenuItem>
                </Menu>
            </div>)
        }
        return (
            <Container component="main" maxWidth="lg" sx={{ display: "flex" }}>
                <CssBaseline />
                <Grid container spacing={2} sx={{ mt: 4 }}>
                    <Grid item xs={3}>
                        <Box sx={{ display: "flex" }}>
                            <Box>
                                <Avatar
                                    alt={authorUsername}
                                    {...this.stringAvatar(authorUsername)}
                                />
                            </Box>
                            <Box ml={2}>
                                <Box className={classes.postInfo}>
                                    <Link className={classes.username} to={`/users/${author ? author.username : ""}`}>
                                        {`@${author ? author.username : ""}`}
                                    </Link>
                                    <div className={classes.email}>
                                        {`${author ? author.email : ""}`}
                                    </div>
                                    <div className={classes.time}>
                                        {`Published ${post ? (new Date(post.createdAt)).toLocaleString() : ""}`}
                                    </div>
                                    <div className={classes.during}>
                                        {`${Math.round(ReadingTime(content).minutes)} min`}
                                        <span> read</span>
                                    </div>
                                    {postOptions}
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={7}>
                        <h1 style={{ marginTop: 0 }}>
                            {post ? post.title : ""}
                        </h1>
                        <div className={classes.postContent}>
                            <Markdown options={{ forceBlock: true }}>
                                {content}
                            </Markdown>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        post: state.Post.singlePost,
        author: state.Post.singlePostAuthor,
        auth: state.Auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthActions: bindActionCreators(authActions, dispatch),
        onPostActions: bindActionCreators(postActions, dispatch)
    }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withRouter, withStyles(styles), withConnect)(SinglePost)
