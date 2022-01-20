import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from '@mui/material/styles'
import styles from './styles'
import { withStyles } from '@mui/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '../../common/Theme/Theme'
import GlobalLoading from '../../components/GlobalLoading/GlobalLoading'
import RenderRoutes from '../../components/RenderRoutes/RenderRoutes'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { SkeletonTheme } from "react-loading-skeleton"


export class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <SkeletonTheme color="white" highlightColor="#DDD">
                    <CssBaseline />
                    <ToastContainer />
                    <GlobalLoading />
                    <RenderRoutes />
                </SkeletonTheme>
            </ThemeProvider>
        )
    }
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {}
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)

export default compose(withStyles(styles), withConnect)(App)
