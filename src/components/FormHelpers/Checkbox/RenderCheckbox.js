import { Checkbox, FormControl, FormControlLabel, FormHelperText } from '@mui/material'
import { withStyles } from '@mui/styles'
import React, { Component } from 'react'
import styles from './styles'

export class RenderCheckbox extends Component {
    render() {
        const { input, label, meta: { touched, invalid, error } } = this.props

        return (
            <FormControl>
                <FormControlLabel
                    control={
                        <Checkbox
                            defaultChecked
                            // checked={input.value ? true : false}
                            onChange={input.onChange}
                        />
                    }
                    label={label}
                />
                <FormHelperText
                    error={touched && invalid}
                >
                    {touched && error}
                </FormHelperText>
            </FormControl>
        )
    }
}

export default withStyles(styles)(RenderCheckbox)
