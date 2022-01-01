import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import Header from '../Header/Header'
import DashboardPage from "../../containers/DashboardPage/DashboardPage"
import Login from "../../containers/Login/Login"
import Signup from "../../containers/Signup/Signup"
import Home from "../../containers/Home/Home"
import { connect } from 'react-redux'
import NotFoundPage from '../../containers/NotFoundPage/NotFoundPage'
import NewPost from '../../containers/NewPost/NewPost'
import SinglePost from '../../containers/SinglePost/SinglePost'
import EditPost from '../../containers/EditPost/EditPost'
import Profile from '../../containers/Profile/Profile'
import PostsOfTag from '../../containers/PostsOfTag/PostsOfTag'


export class RenderRoutes extends Component {
    render() {
        return (
            <Switch>
                <Route path="/dashboard" exact>
                    <Dashboard><DashboardPage /></Dashboard>
                </Route>
                <Route path="/" exact>
                    <div><Header /><Home /></div>
                </Route>
                <Route path="/auth/signup" exact>
                    <div><Header /><Signup /></div>
                </Route>
                <Route path="/auth/login" exact>
                    <div><Header /><Login /></div>
                </Route>
                <Route path="/posts/new" exact>
                    <div><Header /><NewPost /></div>
                </Route>
                <Route path="/users/:username" exact>
                    <div><Header /><Profile /></div>
                </Route>
                <Route path="/tags/:tagId" exact>
                    <div><Header /><PostsOfTag /></div>
                </Route>
                <Route path="/posts/:postId" exact>
                    <div>
                        <Header />
                        <SinglePost />
                    </div>
                </Route>
                <Route path="/posts/:postId/edit" exact>
                    <div><Header /><EditPost /></div>
                </Route>
                <Route exact path="/404" component={NotFoundPage} />
                <Redirect to="/404" />
            </Switch>
        )
    }
}

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps, null)(RenderRoutes)
