export default (state = [], action) => {
    switch (action.type) {
        case 'SET_RECOMMEND':
            return action.recommend
        default:
            return state
    }
}