import { UPDATE_USERINFO } from '../action/types'

function userInfo (state = {}, { type, payload }) {
    switch (type) {
        case UPDATE_USERINFO:
            return payload.data
        default:
            return state
    }
}

export {
    userInfo
}
