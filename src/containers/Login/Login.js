import { Avatar, Box, Container, CssBaseline, Link, Typography } from '@mui/material'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import { withStyles } from '@mui/styles'
import React, { Component } from 'react'
import styles from './styles'
import Form from './Form'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import * as authActions from '../../actions/auth'


export class Login extends Component {
    componentWillMount() {
        const { onAuthActions } = this.props
        const { redirectAuth } = onAuthActions
        redirectAuth()
    }

    render() {
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOpenIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Form />
                </Box>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 8, mb: 4 }}>
                    {'Copyright © '}
                    <Link color="inherit" href="https://github.com/">
                        My Team
                    </Link>
                    {' '}
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

export default compose(withStyles(styles), withConnect)(Login)
