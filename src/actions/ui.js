import {SHOW_LOADING, HIDE_LOADING} from '../constants/ui'

const showLoading = () => {
    return {
        type: SHOW_LOADING
    }
}

const hideLoading = () => {
    return {
        type: HIDE_LOADING
    }
}

export {
    showLoading,
    hideLoading
}
