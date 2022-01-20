import { withStyles } from '@mui/styles'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import styles from './styles'
import * as tagActions from '../../actions/tag'
import { withRouter } from 'react-router-dom'
import { Container, CssBaseline, Grid } from '@mui/material'
import PostItem from '../../components/PostItem/PostItem'
import SkeletonCom from '../../components/Skeleton/SkeletonCom'


export class PostsOfTag extends Component {
    componentWillMount() {
        const { match, onTagActions } = this.props
        const { fetchTag } = onTagActions
        const { tagId } = match.params
        fetchTag(tagId)
    }

    render() {
        const { items } = this.props
        let displayPosts
        if (items.length > 0) {
            displayPosts = (
                items.map((item, index) => <PostItem key={index} item={item} />)
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
            <Container component="main" maxWidth="lg" sx={{ display: "flex", marginTop: "100px" }}>
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
        items: state.Post.postsDisplayed
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTagActions: bindActionCreators(tagActions, dispatch)
    }
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)

export default compose(withRouter, withStyles(styles), withConnect)(PostsOfTag)
