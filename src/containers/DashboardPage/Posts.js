import { withStyles } from '@mui/styles'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import styles from './styles'
import * as authActions from '../../actions/auth'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import faker from 'faker'
import {
    ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine, ReferenceArea,
    ReferenceDot, Tooltip as TooltipRechart, CartesianGrid, Brush, ErrorBar, AreaChart, Area,
    Label, LabelList
} from 'recharts'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export class Posts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: 0,
            chart: 0,
            fakeDays: [...Array(30)].map(i => faker.datatype.number({ min: 100, max: 200 })),
            fakeMonths: [...Array(12)].map(i => faker.datatype.number({ min: 3000, max: 7000 })),
            fakeYears: [...Array(7)].map(i => faker.datatype.number({ min: 21000, max: 24000 })),
            fakeRange: [57892, 198320, 14343, 4332, 124]
        }
    }

    componentWillMount() {
        const { onAuthActions } = this.props
        const { redirectNotAdmin } = onAuthActions
        redirectNotAdmin()
    }

    handleChange = event => {
        const target = event.target
        const name = target.name
        const value = target.value
        this.setState({
            [name]: parseInt(value)
        })
    }

    render() {
        const { type, fakeDays, fakeMonths, fakeYears, chart, fakeRange } = this.state
        let labels, text, datasets, dataLines
        switch (type) {
            case 0: {
                text = "The number of posts that attached to the tag"
                labels = [1, "2-3", "3-5", "5-10", "10+"]
                datasets = [{
                    label: "",
                    data: fakeRange,
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                }]
                dataLines = fakeRange.map((v, i) => ({
                    name: labels[i],
                    Amount: v
                }))
                break
            }
            case 1: {
                text = "New posts amount in the last 15 days"
                labels = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
                datasets = [{
                    label: "",
                    data: fakeDays.slice(15, 30),
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                }]
                dataLines = fakeDays.slice(15, 30).map((v, i) => ({
                    name: labels[i],
                    Amount: v
                }))
                break
            }
            case 2: {
                text = "New posts amount in the last 30 days"
                labels = [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
                datasets = [{
                    label: "",
                    data: fakeDays,
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                }]
                dataLines = fakeDays.map((v, i) => ({
                    name: labels[i],
                    Amount: v
                }))
                break
            }
            case 3: {
                text = "New posts amount in the last 6 months"
                labels = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"]
                datasets = [{
                    label: "",
                    data: fakeMonths.slice(6, 12),
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                }]
                dataLines = fakeMonths.slice(6, 12).map((v, i) => ({
                    name: labels[i],
                    Amount: v
                }))
                break
            }
            case 4: {
                text = "New posts amount in the last 12 months"
                labels = ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"]
                datasets = [{
                    label: "",
                    data: fakeMonths,
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                }]
                dataLines = fakeMonths.map((v, i) => ({
                    name: labels[i],
                    Amount: v
                }))
                break
            }
            case 5: {
                text = "New posts amount in the last 5 years"
                labels = [2017, 2018, 2019, 2020, 2021]
                datasets = [{
                    label: "",
                    data: fakeYears.slice(2, 7),
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                }]
                dataLines = fakeYears.slice(2, 7).map((v, i) => ({
                    name: labels[i],
                    Amount: v
                }))
                break
            }
            case 6: {
                text = "New posts amount in the last 7 years"
                labels = [2015, 2016, 2017, 2018, 2019, 2020, 2021]
                datasets = [{
                    label: "",
                    data: fakeYears,
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                }]
                dataLines = fakeYears.map((v, i) => ({
                    name: labels[i],
                    Amount: v
                }))
                break
            }
        }
        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: text,
                },
            },
        }
        const data = {
            labels,
            datasets,
        }
        let displayChart
        if (chart === 0) {
            displayChart = <Bar options={options} data={data} width={900} height={500} />
        } else {
            displayChart = (
                <div>
                    <h5 style={{ textAlign: "center", color: "gray" }}>{text}</h5>
                    <LineChart title="123" width={850} height={500} data={dataLines}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Line type="monotone" dataKey="Amount" stroke="#8884d8" />
                        <TooltipRechart />
                    </LineChart>
                </div>
            )
        }
        return (
            <div>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                        name="type"
                        value={type}
                        onChange={this.handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value={0}>The number of posts that attach</MenuItem>
                        <MenuItem value={1}>New posts amount in the last 15 days</MenuItem>
                        <MenuItem value={2}>New posts amount in the last 30 days</MenuItem>
                        <MenuItem value={3}>New posts amount in the last 6 months</MenuItem>
                        <MenuItem value={4}>New posts amount in the last 12 months</MenuItem>
                        <MenuItem value={5}>New posts amount in the last 5 years</MenuItem>
                        <MenuItem value={6}>New posts amount in the last 7 years</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                        name="chart"
                        value={chart}
                        onChange={this.handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value={0}>Vertical Bar</MenuItem>
                        <MenuItem value={1}>Line</MenuItem>
                    </Select>
                </FormControl>
                {displayChart}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthActions: bindActionCreators(authActions, dispatch)
    }
}

export default compose(withStyles(styles), connect(null, mapDispatchToProps))(Posts)
