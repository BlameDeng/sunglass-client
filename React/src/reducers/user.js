export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.user
        case 'CHANGE_PROFILE':
            return Object.assign({}, state, action.user)
        default:
            return state
    }
}