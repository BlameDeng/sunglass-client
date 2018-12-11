import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from './reducers'

const initState = {
    newArrival: {
        isFetching: false,
        data: null
    },
    allProducts: {
        isFetching: false,
        data: null
    },
    user: null,
    cart: null,
    receiver: null,
    recommend: null,
    orders:null
}

export const initStore = () => createStore(reducers, initState, applyMiddleware(ReduxThunk))