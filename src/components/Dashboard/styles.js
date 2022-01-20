const styles = theme => ({
    drawer123: {
        background: props => props.color
    },
    link: {
        textDecoration: "none!important",
        color: "inherit!important"
    },
    profileLink: {
        textDecoration: "none!important",
        color: "inherit!important"
    },
    writePost: {
        textDecoration: "none!important",
        color: "inherit!important",
        display: "flex"
    }
})

const stylesDrawer = ({ theme, open, drawerWidth }) => ({
    '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create(['width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
            overflowX: 'hidden',
            width: theme.spacing(7),
            transition: theme.transitions.create(['width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
        }),
    }
})

const stylesAppBar = ({ theme, open, drawerWidth }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    })
})


export {
    styles,
    stylesDrawer,
    stylesAppBar
}
