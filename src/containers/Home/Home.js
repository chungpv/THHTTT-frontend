import { withStyles } from '@mui/styles'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import styles from './styles'

export class Home extends Component {
    render() {
        return (
            <div>
                Home page
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

export default compose(withStyles(styles), connect(mapStateToProps, null))(Home)
