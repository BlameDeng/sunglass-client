export default (state = {}, action) => {
    switch (action.type) {
        case 'REQUEST_ALLPRODUCTS':
        case 'RECEIVE_ALLPRODUCTS':
            return Object.assign({}, state, action.payload)
        default:
            return state
    }
}