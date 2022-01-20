const styles = theme => ({
    postContent: {
        fontSize: "18px",
        lineWeight: 1.75,
        overflow: "hidden",
        "& img": {
            objectFit: "cover",
            width: "100%",
        }
    },
    editPost: {
        color: "inherit!important",
        textDecoration: "none!important"
    },
    postItem: {
        width: "100%",
        marginBottom: "1rem"
    },
    title: {
        fontSize: "1.1rem",
        fontWeight: "600",
        color: "#1b1b1b"
    },
    postInfo: {
        fontSize: ".8rem",
        color: "#5488c7"
    },
    username: {
        textDecoration: "none"
    },
    email: {
        color: "#9b9b9b!important",
        marginTop: 5,
        textDecoration: "none"
    },
    time: {
        color: "#9b9b9b!important",
        marginTop: 5
    },
    during: {
        color: "#9b9b9b!important",
        marginTop: 5
    },
    tag: {
        marginRight: "1rem!important"
    },
    views: {
        fontSize: ".8rem"
    }
})

export default styles
