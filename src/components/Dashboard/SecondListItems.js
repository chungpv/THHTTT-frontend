import { ListItem, ListItemIcon, ListItemText, ListSubheader } from '@mui/material'
import AssignmentIcon from '@mui/icons-material/Assignment'
import React, { Component } from 'react'

export class SecondListItems extends Component {
    render() {
        return (
            <div>
                <ListSubheader inset>Saved reports</ListSubheader>
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Current month" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Last quarter" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Year-end sale" />
                </ListItem>
            </div>
        )
    }
}

export default SecondListItems
