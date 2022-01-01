import {
    FETCH_TAG, FETCH_TAG_FAIL, FETCH_TAG_SUCCESS
} from '../constants/tag'

const fetchTag = tagId => {
    return {
        type: FETCH_TAG,
        payload: {
            tagId
        }
    }
}

const fetchTagSuccess = posts => {
    return {
        type: FETCH_TAG_SUCCESS,
        payload: {
            posts
        }
    }
}

const fetchTagFail = error => {
    return {
        type: FETCH_TAG_FAIL,
        payload: {
            error
        }
    }
}

export {
    fetchTag,
    fetchTagSuccess,
    fetchTagFail
}
