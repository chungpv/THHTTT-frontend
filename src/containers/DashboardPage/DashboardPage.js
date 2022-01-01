import { withStyles } from '@mui/styles'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import styles from './styles'
import * as authActions from '../../actions/auth'


export class DashboardPage extends Component {
    componentWillMount() {
        const { onAuthActions } = this.props
        const { redirectNotAdmin } = onAuthActions
        redirectNotAdmin()
    }

    render() {
        return (
            <div>
                Dashboard page
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthActions: bindActionCreators(authActions, dispatch)
    }
}

export default compose(withStyles(styles), connect(null, mapDispatchToProps))(DashboardPage)
