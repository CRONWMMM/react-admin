import { LOGIN_STATE } from './types'

function loginAction (state = 0) {
    return {
        type: LOGIN_STATE,
        payload: {
            state: state
        },
        error: null
    }
}

export {
    loginAction
}
