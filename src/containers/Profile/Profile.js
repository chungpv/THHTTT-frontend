import { withStyles } from '@mui/styles'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import styles from './styles'
import * as postActions from '../../actions/post'
import { Link, withRouter } from 'react-router-dom'
import { Avatar, Box, Button, Container, CssBaseline, Grid } from '@mui/material'
import PostItemProfile from '../../components/PostItemProfile/PostItemProfile'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import SkeletonCom from '../../components/Skeleton/SkeletonCom'

ChartJS.register(ArcElement, Tooltip, Legend)

export class Profile extends Component {
    componentWillMount() {
        const { match, onPostActions } = this.props
        const { username } = match.params
        const { fetchProfile } = onPostActions
        fetchProfile(username)
    }

    stringToColor = name => {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < name.length; i += 1) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.substr(-2);
        }

        return color;
    }

    stringAvatar = name => {
        return {
            sx: {
                bgcolor: this.stringToColor(name),
                width: 72,
                height: 72
            },
            children: `${name.substring(0, 2).toUpperCase()}`,
        }
    }

    data = () => {
        const { postsDisplayed } = this.props
        const labels = postsDisplayed.map(post => post.tags.map(tag => tag.content))
            .reduce((total, tags) => total.concat(tags), [])
        let mapLabels = {}
        let bgColors = []
        let bdColors = []
        for (let i = 0; i < labels.length; i++) {
            const el = labels[i]
            mapLabels[el] = (mapLabels[el] || 0) + 1
        }
        for (let i = 0; i < Object.keys(mapLabels).length; i++) {
            const r = Math.floor(Math.random() * 196) + 60
            const g = Math.floor(Math.random() * 196) + 60
            const b = Math.floor(Math.random() * 196) + 60
            bgColors.push(`rgba(${r}, ${g}, ${b}, 0.3)`)
            bdColors.push(`rgba(${r}, ${g}, ${b}, 1)`)
        }
        return {
            labels: Object.keys(mapLabels),
            datasets: [
                {
                    label: '# of Votes',
                    data: Object.values(mapLabels),
                    backgroundColor: bgColors,
                    borderColor: bdColors,
                    borderWidth: 1,
                },
            ],
        }
    }

    render() {
        const { postsDisplayed, userProfile, auth, classes } = this.props
        let displayPosts
        if (postsDisplayed.length > 0) {
            displayPosts = (
                postsDisplayed.map((post, index) => <PostItemProfile key={index} post={post} userProfile={userProfile} />)
            )
        } else {
            displayPosts = (
                <div>
                    <SkeletonCom />
                    <SkeletonCom />
                    <SkeletonCom />
                </div>
            )
        }
        const username = userProfile ? userProfile.username : "example"
        const email = userProfile ? userProfile.email : "example@gmail.com"
        const data = this.data()
        return (
            <Container component="main" maxWidth="lg" sx={{ marginTop: "100px" }}>
                <CssBaseline />
                <Grid item xs={3} sx={{ margin: "20px auto" }}>
                    <Box sx={{ display: "flex" }}>
                        <Box>
                            <Avatar
                                alt={username}
                                {...this.stringAvatar(username)}
                            />
                        </Box>
                        <Box ml={8} sx={{ display: "flex" }}>
                            <Box className={classes.profileInfo}>
                                <div className={classes.username}>
                                    {`@${username}`}
                                </div>
                                <div className={classes.email}>
                                    {`${email}`}
                                </div>
                            </Box>
                            <Box ml={2}>
                                {username === auth.username ? (<Button variant="outlined">Edit</Button>) : null}
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <hr
                    style={{
                        color: "inherit",
                        backgroundColor: "inherit",
                        height: 1
                    }}
                />
                <Container component="main" maxWidth="lg" sx={{ display: "flex" }}>
                    <Grid container spacing={2} sx={{ mt: 4 }}>
                        <Grid item xs={8} sx={{ display: "flex", flexDirection: "column", justifyContent: "end" }}>
                            {displayPosts}
                        </Grid>
                        <Grid item xs={4}>
                            <Pie data={data} />
                        </Grid>
                    </Grid>
                </Container>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        postsDisplayed: state.Post.postsDisplayed,
        userProfile: state.Post.userProfile,
        auth: state.Auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPostActions: bindActionCreators(postActions, dispatch)
    }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(withRouter, withStyles(styles), withConnect)(Profile)
