import { ADD_PAGETAB, DELETE_PAGETAB } from './types'

function addPageTab(data) {
    return {
        type: ADD_PAGETAB,
        payload: {
            data
        },
        error: null
    }
}

function deletePageTab(data) {
    return {
        type: DELETE_PAGETAB,
        payload: {
            data
        },
        error: null
    }
}

export {
    addPageTab,
    deletePageTab
}
