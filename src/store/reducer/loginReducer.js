import { LOGIN_STATE } from '../action/types'

// 登录 action
const loginReducer = (state = 0, { type, payload }) => {
    switch (type) {
        case LOGIN_STATE:
            return payload.state
        default:
            return state
    }
}

export {
    loginReducer
}
