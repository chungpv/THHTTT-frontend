import { withStyles } from '@mui/styles'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import styles from './styles'
import * as authActions from '../../actions/auth'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2'
import { Container, Grid } from '@mui/material'
ChartJS.register(ArcElement, Tooltip, Legend);


export class DashboardPage extends Component {
    componentWillMount() {
        const { onAuthActions } = this.props
        const { redirectNotAdmin } = onAuthActions
        redirectNotAdmin()
    }
    dataPosts = () => {
        let bgColors = []
        let bdColors = []
        for (let i = 0; i < 5; i++) {
            const r = Math.floor(Math.random() * 196) + 60
            const g = Math.floor(Math.random() * 196) + 60
            const b = Math.floor(Math.random() * 196) + 60
            bgColors.push(`rgba(${r}, ${g}, ${b}, 0.3)`)
            bdColors.push(`rgba(${r}, ${g}, ${b}, 1)`)
        }
        return {
            labels: ["1", "2-3", "3-5", "5-10", "10+"],
            datasets: [
                {
                    label: 'number of posts',
                    data: [57892, 198320, 14343, 4332, 124],
                    backgroundColor: bgColors,
                    borderColor: bdColors,
                    borderWidth: 1,
                },
            ],
        }
    }

    dataTags = () => {
        let bgColors = []
        let bdColors = []
        for (let i = 0; i < 5; i++) {
            const r = Math.floor(Math.random() * 196) + 60
            const g = Math.floor(Math.random() * 196) + 60
            const b = Math.floor(Math.random() * 196) + 60
            bgColors.push(`rgba(${r}, ${g}, ${b}, 0.3)`)
            bdColors.push(`rgba(${r}, ${g}, ${b}, 1)`)
        }
        return {
            labels: ["1-10", "11-50", "51-200", "200-500", "500+"],
            datasets: [
                {
                    label: 'number of tags',
                    data: [2341, 12324, 45643, 213440, 21344],
                    backgroundColor: bgColors,
                    borderColor: bdColors,
                    borderWidth: 1,
                },
            ],
        }
    }

    dataUsers = () => {
        let bgColors = []
        let bdColors = []
        for (let i = 0; i < 6; i++) {
            const r = Math.floor(Math.random() * 196) + 60
            const g = Math.floor(Math.random() * 196) + 60
            const b = Math.floor(Math.random() * 196) + 60
            bgColors.push(`rgba(${r}, ${g}, ${b}, 0.3)`)
            bdColors.push(`rgba(${r}, ${g}, ${b}, 1)`)
        }
        return {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [
                {
                    label: 'number of users',
                    data: [35430, 6542, 3432, 2129, 986, 47],
                    backgroundColor: bgColors,
                    borderColor: bdColors,
                    borderWidth: 1,
                },
            ],
        }
    }
    render() {
        return (
            <Container component="main" maxWidth="lg" sx={{ display: "flex" }}>
                <Grid container spacing={2} sx={{ mt: 4 }}>
                    <Grid item xs={5}>
                        <h5 style={{textAlign: "center"}}>The number of posts that attached to the tag</h5>
                        <Pie data={this.dataPosts()} />
                    </Grid>
                    <Grid item xs={5}>
                        <h5 style={{textAlign: "center"}}>The number of tags that attached to the post</h5>
                        <Pie data={this.dataTags()} />
                    </Grid>
                    <Grid item xs={5}>
                        <h5 style={{textAlign: "center"}}>The number of user that write post</h5>
                        <Pie data={this.dataUsers()} />
                    </Grid>
                </Grid>
            </Container>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthActions: bindActionCreators(authActions, dispatch)
    }
}

export default compose(withStyles(styles), connect(null, mapDispatchToProps))(DashboardPage)
