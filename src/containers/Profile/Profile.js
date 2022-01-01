import { withStyles } from '@mui/styles'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import styles from './styles'
import * as postActions from '../../actions/post'
import { withRouter } from 'react-router-dom'
import { Container, CssBaseline, Grid } from '@mui/material'
import PostItemProfile from '../../components/PostItemProfile/PostItemProfile'


export class Profile extends Component {
    componentWillMount() {
        const { match, onPostActions } = this.props
        const { username } = match.params
        const { fetchProfile } = onPostActions
        fetchProfile(username)
    }

    render() {
        const { postsDisplayed, userProfile } = this.props
        const displayPosts = postsDisplayed.map((post, index) => {
            return (
                <PostItemProfile key={index} post={post} userProfile={userProfile} />
            )
        })
        return (
            <Container component="main" maxWidth="lg" sx={{ display: "flex" }}>
                <CssBaseline />
                <Grid container spacing={2} sx={{ mt: 4 }}>
                    <Grid item xs={7} sx={{ margin: "auto" }}>
                        {displayPosts}
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        postsDisplayed: state.Post.postsDisplayed,
        userProfile: state.Post.userProfile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPostActions: bindActionCreators(postActions, dispatch)
    }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withRouter, withStyles(styles), withConnect)(Profile)
