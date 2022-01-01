import { TextField } from '@mui/material'
import { withStyles } from '@mui/styles'
import React, { Component } from 'react'
import styles from './styles'

export class RenderTextField extends Component {
    render() {
        const { label, input, meta: { touched, invalid, error }, ...custom } = this.props

        return (
            <TextField
                label={label}
                placeholder={label}
                error={touched && invalid}
                helperText={touched && error}
                {...input}
                {...custom}
            />
        )
    }
}

export default withStyles(styles)(RenderTextField)
