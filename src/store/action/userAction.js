import { UPDATE_USERINFO } from './types'

function updateUserInfo (data = {
    username: '',
    password: '',
    avatar: ''
}) {
    return {
        type: UPDATE_USERINFO,
        payload: {
            data
        },
        error: null
    }
}

export {
    updateUserInfo
}
