import { Button, Grid, Link } from '@mui/material'
import { withStyles } from '@mui/styles'
import PasswordValidator from 'password-validator'
import EmailValidator from 'email-validator'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import RenderCheckbox from '../../components/FormHelpers/Checkbox/RenderCheckbox'
import RenderTextField from '../../components/FormHelpers/TextField/RenderTextField'
import styles from './styles'
import * as authActions from '../../actions/auth'
import LinkUi from '@mui/material/Link'


const schemaPassword = new PasswordValidator()
schemaPassword
    .is().min(8)
    .is().max(100)

export class Form extends Component {
    onHandleSubmit = data => {
        const { onAuthActions } = this.props
        const { signup } = onAuthActions
        const { username, email, password, passwordConfirmation } = data
        signup(username, email, password, passwordConfirmation)
    }

    render() {
        const { classes, handleSubmit, invalid, submitting } = this.props
        return (
            <form
                className={classes.formSignup}
                onSubmit={handleSubmit(this.onHandleSubmit)}
                sx={{ mt: 3 }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Field
                            name="username"
                            id="username"
                            label="User Name"
                            autoComplete="given-name"
                            fullWidth
                            autoFocus
                            component={RenderTextField}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            component={RenderTextField}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            component={RenderTextField}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            fullWidth
                            name="passwordConfirmation"
                            label="Password confirmation"
                            type="password"
                            id="passwordConfirmation"
                            autoComplete="new-password"
                            component={RenderTextField}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Field
                            id="agree"
                            name="agree"
                            label="I agree the policies."
                            component={RenderCheckbox}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    color="primary"
                    disabled={invalid || submitting}
                >
                    Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <LinkUi href="/auth/login" variant="body2">
                            Already have an account? Sign in
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
    } else {
        const alphaNumericRex = /^[a-z0-9]+$/i
        const isValidUsername = alphaNumericRex.test(values.username)
        if (!isValidUsername) {
            errors.username = "Username only contained alphanumeric characters"
        }
    }
    if (!values.email || !values.email.trim()) {
        errors.email = "Required"
    } else if (!EmailValidator.validate(values.email)) {
        errors.email = "Invalid email format"
    }
    if (!values.password || !values.password.trim()) {
        errors.password = "Required"
    } else {
        const validPassword = schemaPassword.validate(values.password, { details: true })
        if (validPassword.length > 0) {
            let message = ""
            validPassword.forEach(alert => { message += `${alert.message}. ` })
            errors.password = message
        }
    }

    if (!values.passwordConfirmation || !values.passwordConfirmation.trim()) {
        errors.passwordConfirmation = "Required"
    } else if (values.password
        && values.password.trim()
        && values.passwordConfirmation
        && values.passwordConfirmation.trim()
        && values.password !== values.passwordConfirmation) {
        errors.passwordConfirmation = "Password confirmation is different password"
    }
    if (values.agree === false) {
        errors.agree = "You must agree the policies first"
    }
    return errors
}

const withReduxForm = reduxForm({
    form: "SIGN_UP",
    validate
})

export default compose(withStyles(styles), withConnect, withReduxForm)(Form)
