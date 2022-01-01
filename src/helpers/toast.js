import { toast } from 'react-toastify'


const toastNotif = (type, text) => {
    let config = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    }
    switch (type) {
        case "success":
            toast.success(text, config)
            break
        case "warning":
            toast.warn(text, config)
            break
        case "error":
            toast.error(text, config)
            break
        default:
            toast(text, config)
            break
    }
}

export default toastNotif
