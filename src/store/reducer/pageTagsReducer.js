import { ADD_PAGETAG, DELETE_PAGETAG } from '../action/types'

function pageTags(state = [], { type, payload }) {
    switch (type) {
        case ADD_PAGETAG:
            return [...state, payload.data]
        case DELETE_PAGETAG:
            return state.filter(({ key }) => {
                return key !== payload.data.key
            })
        default:
            return state
    }
}

export {
    pageTags
}
