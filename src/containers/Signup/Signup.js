import { Avatar, Box, Container, CssBaseline, Link, Typography } from '@mui/material'
import { withStyles } from '@mui/styles'
import React, { Component } from 'react'
import styles from './styles'
import LoginIcon from '@mui/icons-material/Login'
import Form from './Form'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import * as authActions from '../../actions/auth'


export class Signup extends Component {
    componentWillMount() {
        const { onAuthActions } = this.props
        const { redirectAuth } = onAuthActions
        redirectAuth()
    }

    render() {
        return (
            <Container component="main" maxWidth="xs" sx={{ marginTop: "100px" }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
                        <LoginIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" mb={3}>
                        Sign up
                    </Typography>
                    <Form />
                </Box>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
                    {'Copyright © '}
                    <Link color="inherit" href="https://mui.com/">
                        My Website
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthActions: bindActionCreators(authActions, dispatch)
    }
}

const withConnect = connect(
    null,
    mapDispatchToProps
)

export default compose(withStyles(styles), withConnect)(Signup)
