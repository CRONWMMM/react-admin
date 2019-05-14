import { USERINFO_UPDATE } from '../action/types'

function userInfo (state = {}, { type, payload }) {
    switch (type) {
        case USERINFO_UPDATE:
            return payload.data
        default:
            return state
    }
}

export {
    userInfo
}
