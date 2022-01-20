import { withStyles } from '@mui/styles'
import React, { Component } from 'react'
import styles from './styles'
import { SimpleMdeReact } from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { Autocomplete, Button, Chip, Container, CssBaseline, Grid, TextField } from '@mui/material'

export class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            title: this.props.title || "",
            tags: this.props.tags || [],
            content: this.props.content || ""
        }
    }

    onChange = (event, multiValues) => {
        const target = event.target
        const name = target.name
        let value = target.value
        this.setState({
            [name]: value
        })
    }

    onChangeMultiTags = (event, tags) => {
        this.setState({
            tags
        })
    }

    onChangeSimpleMDE = content => {
        this.setState({
            content
        })
    }

    onHandleSubmit = () => {
        this.props.onHandleSubmit(this.state)
    }

    render() {
        const { title, tags, content } = this.state
        const disabled = !(title && tags.length > 0 && content)
        return (
            <Container component="main" maxWidth="lg" sx={{ bgcolor: "#f0f0f0", marginTop: "100px" }}>
                <CssBaseline />
                <Grid container mt={2}>
                    <Grid item xs={12} mb={4} mt={4}>
                        <TextField
                            label="Title"
                            variant="standard"
                            name="title"
                            sx={{ width: "100%" }}
                            value={title}
                            onChange={this.onChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={10} mb={4}>
                        <Autocomplete
                            multiple
                            id="tags"
                            options={[]}
                            defaultValue={tags}
                            freeSolo
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        variant="outlined"
                                        label={option}
                                        {...getTagProps({ index })}
                                    />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Tags"
                                    name="tags"
                                />
                            )}
                            onInputChange={(event, multiValues) => { }}
                            onChange={this.onChangeMultiTags}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={2}
                        mb={4}
                        sx={{ display: "flex" }}
                        justifyContent="flex-end"
                        alignItems="center"
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            onClick={this.onHandleSubmit}
                            disabled={disabled}
                        >
                            Publish
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <SimpleMdeReact
                            options={{
                                autofocus: false,
                                autoDownloadFontAwesome: true,
                                spellChecker: false,
                                lineNumbers: true,
                            }}
                            value={content}
                            onChange={this.onChangeSimpleMDE}
                        />
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

export default withStyles(styles)(Form)
