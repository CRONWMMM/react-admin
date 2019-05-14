import { USERINFO_UPDATE } from './types'

function updateUserInfo (data = {
    username: '',
    password: ''
}) {
    return {
        type: USERINFO_UPDATE,
        payload: {
            data
        },
        error: null
    }
}

export {
    updateUserInfo
}
