const styles = theme => ({
    globalLoading: {
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 99,
        background: 'rgba(0, 0, 0, 0.4)'
    },
    gif: {
        position: "fixed",
        top: "50%",
        left: "50%",
        width: 500,
        transform: "translate(-50%, -50%)"
    }
})

export default styles
