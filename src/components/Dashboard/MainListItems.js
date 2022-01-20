import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import GroupsIcon from '@mui/icons-material/Groups'
import PostAddIcon from '@mui/icons-material/PostAdd'
import TagIcon from '@mui/icons-material/Tag'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@mui/styles'
import { styles } from './styles'

export class MainListItems extends Component {
    render() {
        const { classes } = this.props

        return (
            <div>
                <Link to="/dashboard" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                </Link>
                <Link to="/dashboard/users" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <GroupsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Users" />
                    </ListItem>
                </Link>
                <Link to="/dashboard/posts" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <PostAddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Posts" />
                    </ListItem>
                </Link>
                <Link to="/dashboard/tags" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>
                            <TagIcon />
                        </ListItemIcon>
                        <ListItemText primary="Tags" />
                    </ListItem>
                </Link>
            </div>
        )
    }
}

export default withStyles(styles)(MainListItems)
