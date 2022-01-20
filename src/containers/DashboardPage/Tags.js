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

export class Tags extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: 0,
            chart: 0,
            fakeRange: [2341, 12324, 45643, 213440, 21344]
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
        const { type, chart, fakeRange } = this.state
        let labels, text, datasets, dataLines
        switch (type) {
            case 0: {
                text = "The number of tags that attached to the post"
                labels = ["1-10", "11-50", "51-200", "200-500", "500+"]
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
                        <MenuItem value={0}>The number of tags that attached to the post</MenuItem>
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

export default compose(withStyles(styles), connect(null, mapDispatchToProps))(Tags)
