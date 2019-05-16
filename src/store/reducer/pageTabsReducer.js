import { ADD_PAGETAB, DELETE_PAGETAB } from '../action/types'

function pageTabs(state = [], { type, payload }) {
    switch (type) {
        case ADD_PAGETAB:
            return [...state, payload.data]
        case DELETE_PAGETAB:
            return state.filter(({ key }) => key !== payload.data.key)
        default:
            return state
    }
}

export {
    pageTabs
}
