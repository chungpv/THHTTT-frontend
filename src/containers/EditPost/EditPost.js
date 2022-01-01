import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as postActions from '../../actions/post'
import Form from './Form'
import { bindActionCreators, compose } from 'redux'
import { withRouter } from 'react-router-dom'


export class EditPost extends Component {
    componentWillMount() {
        const { onPostActions, match } = this.props
        const { fetchPostEditting } = onPostActions
        const { postId } = match.params
        fetchPostEditting(postId)
    }

    onHandleSubmit = ({ id, title, tags, content }) => {
        const { onPostActions } = this.props
        const { updatePost } = onPostActions
        updatePost(id, title, tags, content)
    }

    render() {
        const { post } = this.props
        return (
            <Form
                post={post}
                onHandleSubmit={this.onHandleSubmit}
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        post: state.Post.postEditting
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPostActions: bindActionCreators(postActions, dispatch)
    }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withRouter, withConnect)(EditPost)
