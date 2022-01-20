import { Container, CssBaseline, Grid } from '@mui/material'
import { withStyles } from '@mui/styles'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import styles from './styles'
import * as postActions from '../../actions/post'
import PostItem from '../../components/PostItem/PostItem'
import SkeletonCom from '../../components/Skeleton/SkeletonCom'

export class Home extends Component {
    componentDidMount() {
        const { onPostActions } = this.props
        const { fetchPosts } = onPostActions
        fetchPosts()
    }

    render() {
        const { posts } = this.props
        let displayPosts
        if (posts.length > 0) {
            displayPosts = (
                posts.map((post, index) => {
                    return (
                        <PostItem key={index} item={post} />
                    )
                })
            )
        } else {
            displayPosts = (
                <div>
                    <SkeletonCom />
                    <SkeletonCom />
                    <SkeletonCom />
                </div>
            )
        }

        return (
            <Container component="main" maxWidth="lg" sx={{ marginTop: "100px" }}>
                <CssBaseline />
                <Grid container spacing={2} sx={{ mt: 4 }}>
                    <Grid item xs={8} sx={{ display: "flex", flexDirection: "column", justifyContent: "end" }}>
                        {displayPosts}
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.Post.postsDisplayed
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPostActions: bindActionCreators(postActions, dispatch)
    }
}

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Home)
