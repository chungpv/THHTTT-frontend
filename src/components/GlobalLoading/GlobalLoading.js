import { withStyles } from '@mui/styles'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import styles from './styles'
import * as uiActions from '../../actions/ui'

export class GlobalLoading extends Component {
    render() {
        const { classes, displayLoading } = this.props
        let xhtml = null
        if (displayLoading) {
            xhtml = (
                <div className={classes.globalLoading}>
                    <img src='/assets/images/loading.gif' className={classes.gif} alt='' />
                </div>
            )
        }

        return xhtml
    }
}

const mapStateToProps = state => {
    return {
        displayLoading: state.Ui.displayLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        uiActions: bindActionCreators(uiActions, dispatch)
    }
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)

export default compose(withStyles(styles), withConnect)(GlobalLoading)
