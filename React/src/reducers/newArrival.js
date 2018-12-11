export default (state = {}, action) => {
    switch (action.type) {
        case 'REQUEST_NEWARRIVAL':
        case 'RECEIVE_NEWARRIVAL':
            return Object.assign({}, state, action.payload)
        default:
            return state
    }
}