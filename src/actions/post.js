import {
    FETCH_POSTS,
    FETCH_POSTS_FAIL,
    FETCH_POSTS_SUCCESS,
    FILTER_POSTS,
    FILTER_POSTS_SUCCESS,
    CREATE_POST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAIL,
    FETCH_POST,
    FETCH_POST_SUCCESS,
    FETCH_POST_FAIL,
    FETCH_POST_EDITTING,
    FETCH_POST_EDITTING_SUCCESS,
    FETCH_POST_EDITTING_FAIL,
    UPDATE_POST,
    UPDATE_POST_SUCCESS,
    UPDATE_POST_FAIL,
    FETCH_PROFILE,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAIL,
    DELETE_POST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAIL
} from "../constants/post"


const fetchPosts = () => {
    return {
        type: FETCH_POSTS
    }
}

const fetchPostsSuccess = data => {
    return {
        type: FETCH_POSTS_SUCCESS,
        payload: {
            data
        }
    }
}

const fetchPostsFail = error => {
    return {
        type: FETCH_POSTS_FAIL,
        payload: {
            error
        }
    }
}

const filterPosts = keyword => {
    return {
        type: FILTER_POSTS,
        payload: {
            keyword
        }
    }
}

const filterPostsSuccess = data => {
    return {
        type: FILTER_POSTS_SUCCESS,
        payload: {
            data
        }
    }
}

const createPost = (title, tags, content) => {
    return {
        type: CREATE_POST,
        payload: {
            title,
            tags,
            content
        }
    }
}

const createPostSuccess = () => {
    return {
        type: CREATE_POST_SUCCESS
    }
}

const createPostFail = error => {
    return {
        type: CREATE_POST_FAIL,
        payload: {
            error
        }
    }
}

const fetchPost = postId => {
    return {
        type: FETCH_POST,
        payload: {
            postId
        }
    }
}

const fetchPostSuccess = (singlePost, singlePostAuthor) => {
    return {
        type: FETCH_POST_SUCCESS,
        payload: {
            singlePost,
            singlePostAuthor
        }
    }
}

const fetchPostFail = error => {
    return {
        type: FETCH_POST_FAIL,
        payload: {
            error
        }
    }
}

const fetchPostEditting = postId => {
    return {
        type: FETCH_POST_EDITTING,
        payload: {
            postId
        }
    }
}

const fetchPostEdittingSuccess = postEditting => {
    return {
        type: FETCH_POST_EDITTING_SUCCESS,
        payload: {
            postEditting
        }
    }
}

const fetchPostEdittingFail = error => {
    return {
        type: FETCH_POST_EDITTING_FAIL,
        payload: {
            error
        }
    }
}

const updatePost = (postId, title, tags, content) => {
    return {
        type: UPDATE_POST,
        payload: {
            postId,
            title,
            tags,
            content
        }
    }
}

const updatePostSuccess = () => {
    return {
        type: UPDATE_POST_SUCCESS
    }
}

const updatePostFail = error => {
    return {
        type: UPDATE_POST_FAIL,
        payload: {
            error
        }
    }
}

const fetchProfile = username => {
    return {
        type: FETCH_PROFILE,
        payload: {
            username
        }
    }
}

const fetchProfileSuccess = (postsDisplayed, userProfile) => {
    return {
        type: FETCH_PROFILE_SUCCESS,
        payload: {
            postsDisplayed,
            userProfile
        }
    }
}

const fetchProfileFail = error => {
    return {
        type: FETCH_PROFILE_FAIL,
        payload: {
            error
        }
    }
}

const deletePost = postId => {
    return {
        type: DELETE_POST,
        payload: {
            postId
        }
    }
}

const deletePostSuccess = () => {
    return {
        type: DELETE_POST_SUCCESS
    }
}

const deletePostFail = error => {
    return {
        type: DELETE_POST_FAIL
    }
}


export {
    fetchPosts,
    fetchPostsSuccess,
    fetchPostsFail,
    filterPosts,
    filterPostsSuccess,
    createPost,
    createPostSuccess,
    createPostFail,
    fetchPost,
    fetchPostSuccess,
    fetchPostFail,
    fetchPostEditting,
    fetchPostEdittingSuccess,
    fetchPostEdittingFail,
    updatePost,
    updatePostSuccess,
    updatePostFail,
    fetchProfile,
    fetchProfileSuccess,
    fetchProfileFail,
    deletePost,
    deletePostSuccess,
    deletePostFail
}
