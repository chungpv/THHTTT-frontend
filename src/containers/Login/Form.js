import { Button, Grid, Link } from '@mui/material'
import { withStyles } from '@mui/styles'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import RenderTextField from '../../components/FormHelpers/TextField/RenderTextField'
import styles from './styles'
import * as authActions from '../../actions/auth'
import LinkUi from '@mui/material/Link'


export class Form extends Component {
    onHandleSubmit = data => {
        const { onAuthActions } = this.props
        const { login } = onAuthActions
        const { username, password } = data
        login(username, password)
    }

    render() {
        const { classes, handleSubmit, invalid, submitting } = this.props

        return (
            <form
                className={classes.formLogin}
                onSubmit={handleSubmit(this.onHandleSubmit)}
            >
                <Field
                    margin="normal"
                    fullWidth
                    id="username"
                    label="User name"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    component={RenderTextField}
                />
                <Field
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    component={RenderTextField}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={invalid || submitting}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                    </Grid>
                    <Grid item>
                        <LinkUi href="/auth/signup" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </LinkUi>
                    </Grid>
                </Grid>
            </form>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthActions: bindActionCreators(authActions, dispatch)
    }
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)

const validate = values => {
    const errors = {}
    if (!values.username || !values.username.trim()) {
        errors.username = "Required"
    }
    if (!values.password || !values.password.trim()) {
        errors.password = "Required"
    }
    return errors
}

const withReduxForm = reduxForm({
    form: "LOG_IN",
    validate
})

export default compose(withStyles(styles), withConnect, withReduxForm)(Form)
