import { withStyles } from '@mui/styles'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import styles from './styles'
import * as postActions from '../../actions/post'
import { Box, Container } from '@mui/material'
import PostItem from '../PostItem/PostItem'

export class PostsList extends Component {
    componentDidMount() {
        const { onPostActions } = this.props
        const { fetchPosts } = onPostActions
        fetchPosts()
    }

    render() {
        const { postsDisplayed } = this.props
        const displayPosts = postsDisplayed.map((p, index) => {
            return (
                <PostItem
                    key={index}
                    post={p}
                />
            )
        })
        return (
            <Container maxWidth="md">
                <Box mt={5}>
                    {displayPosts}
                </Box>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        postsDisplayed: state.Post.postsDisplayed
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPostActions: bindActionCreators(postActions, dispatch)
    }
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)

export default compose(withStyles(styles), withConnect)(PostsList)
