import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as postActions from '../../actions/post'
import Form from './Form'
import * as authActions from '../../actions/auth'


export class NewPost extends Component {
    componentWillMount() {
        const { onAuthActions } = this.props
        const { redirectNotAuth } = onAuthActions
        redirectNotAuth()
    }

    onHandleSubmit = ({title, tags, content}) => {
        const { onPostActions } = this.props
        const { createPost } = onPostActions
        createPost(title, tags, content)
    }

    render() {
        return (
            <Form
                onHandleSubmit={this.onHandleSubmit}
            />
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPostActions: bindActionCreators(postActions, dispatch),
        onAuthActions: bindActionCreators(authActions, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(NewPost)
