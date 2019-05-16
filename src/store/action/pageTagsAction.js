import { ADD_PAGETAG, DELETE_PAGETAG } from './types'

function addPageTag(data) {
    return {
        type: ADD_PAGETAG,
        payload: {
            data
        },
        error: null
    }
}

function deletePageTag(data) {
    return {
        type: DELETE_PAGETAG,
        payload: {
            data
        },
        error: null
    }
}

export {
    addPageTag,
    deletePageTag
}
