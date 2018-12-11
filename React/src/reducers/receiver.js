export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_RECEIVER':
            return action.receiver
        case 'UPDATE_RECEIVER':
            return Object.assign({}, state, action.receiver)
        default:
            return state
    }
}