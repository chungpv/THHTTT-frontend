import { SHOW_LOADING, HIDE_LOADING } from "../constants/ui";

const initState = {
    displayLoading: false
}

const UiReducer = (state = initState, action) => {
    switch (action.type) {
        case SHOW_LOADING:
            return {
                ...state,
                displayLoading: true
            }
        case HIDE_LOADING:
            return {
                ...state,
                displayLoading: false
            }
        default:
            return state
    }
}

export default UiReducer
