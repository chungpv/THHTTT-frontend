import {
    CREATE_POST,
    CREATE_POST_FAIL,
    CREATE_POST_SUCCESS,
    DELETE_POST,
    DELETE_POST_FAIL,
    DELETE_POST_SUCCESS,
    FETCH_POST,
    FETCH_POSTS,
    FETCH_POSTS_FAIL,
    FETCH_POSTS_SUCCESS,
    FETCH_POST_EDITTING,
    FETCH_POST_EDITTING_FAIL,
    FETCH_POST_EDITTING_SUCCESS,
    FETCH_POST_FAIL,
    FETCH_POST_RE,
    FETCH_POST_RE_FAIL,
    FETCH_POST_RE_SUCCESS,
    FETCH_POST_SUCCESS,
    FETCH_PROFILE,
    FETCH_PROFILE_FAIL,
    FETCH_PROFILE_SUCCESS,
    FILTER_POSTS,
    FILTER_POSTS_SUCCESS,
    UPDATE_POST,
    UPDATE_POST_FAIL,
    UPDATE_POST_SUCCESS
} from '../constants/post'
import {
    FETCH_TAG,
    FETCH_TAG_SUCCESS,
    FETCH_TAG_FAIL
} from '../constants/tag'
import toast from '../helpers/toast'


const initState = {
    posts: [],
    postsDisplayed: [],
    error: null,
    keyword: "",
    singlePost: null,
    singlePostAuthor: null,
    postEditting: null,
    userProfile: null,
    page: 1,
    postsRecommend: []
}

const PostsReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_POSTS: {
            return {
                ...state,
                posts: [],
                postsDisplayed: []
            }
        }
        case FETCH_POSTS_SUCCESS: {
            const { posts, page } = action.payload
            return {
                ...state,
                posts: posts,
                postsDisplayed: posts,
                page
            }
        }
        case FETCH_POSTS_FAIL: {
            const { error } = action.payload
            toast("error", error)
            return {
                ...state,
                posts: [],
                postsDisplayed: [],
                error
            }
        }
        case FILTER_POSTS: {
            const { keyword } = action.payload
            return {
                ...state,
                keyword: keyword
            }
        }
        case FILTER_POSTS_SUCCESS: {
            const { data } = action.payload
            return {
                ...state,
                postsDisplayed: data
            }
        }
        case CREATE_POST: {
            return {
                ...state
            }
        }
        case CREATE_POST_SUCCESS: {
            toast("success", "Create post successfully")
            return {
                ...state
            }
        }
        case CREATE_POST_FAIL: {
            const { error } = action.payload
            toast("error", error)
            return {
                ...state,
                error
            }
        }
        case FETCH_POST: {
            return {
                ...state
            }
        }
        case FETCH_POST_SUCCESS: {
            const { singlePost, singlePostAuthor } = action.payload
            return {
                ...state,
                singlePost,
                singlePostAuthor
            }
        }
        case FETCH_POST_FAIL: {
            const { error } = action.payload
            toast("error", error)
            return {
                ...state,
                error
            }
        }
        case FETCH_POST_EDITTING: {
            return {
                ...state
            }
        }
        case FETCH_POST_EDITTING_SUCCESS: {
            const { postEditting } = action.payload
            return {
                ...state,
                postEditting
            }
        }
        case FETCH_POST_EDITTING_FAIL: {
            const { error } = action.payload
            toast("error", error)
            return {
                ...state,
                error
            }
        }
        case UPDATE_POST: {
            return {
                ...state
            }
        }
        case UPDATE_POST_SUCCESS: {
            toast("success", "Update post successfully")
            return {
                ...state
            }
        }
        case UPDATE_POST_FAIL: {
            const { error } = action.payload
            toast("error", error)
            return {
                ...state,
                error
            }
        }
        case FETCH_PROFILE: {
            return {
                ...state
            }
        }
        case FETCH_PROFILE_SUCCESS: {
            const { postsDisplayed, userProfile } = action.payload
            return {
                ...state,
                postsDisplayed,
                userProfile,
                posts: postsDisplayed
            }
        }
        case FETCH_PROFILE_FAIL: {
            const { error } = action.payload
            return {
                ...state,
                error,
                posts: [],
                postsDisplayed: []
            }
        }
        case DELETE_POST: {
            return { ...state }
        }
        case DELETE_POST_SUCCESS: {
            toast("success", "Delete post successfully")
            return { ...state }
        }
        case DELETE_POST_FAIL: {
            const { error } = action.payload
            return {
                ...state,
                error
            }
        }
        case FETCH_TAG: {
            return {
                ...state
            }
        }
        case FETCH_TAG_SUCCESS: {
            const { posts } = action.payload
            return {
                ...state,
                posts,
                postsDisplayed: posts
            }
        }
        case FETCH_TAG_FAIL: {
            const { error } = action.payload
            return {
                ...state,
                error,
                posts: [],
                postsDisplayed: []
            }
        }
        case FETCH_POST_RE: {
            return {
                ...state
            }
        }
        case FETCH_POST_RE_SUCCESS: {
            const { postsRecommend } = action.payload
            return {
                ...state,
                postsRecommend
            }
        }
        case FETCH_POST_RE_FAIL: {
            const { error } = action.payload
            return {
                ...state,
                error
            }
        }
        default:
            return state
    }
}

export default PostsReducer
