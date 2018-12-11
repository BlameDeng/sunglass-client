import { combineReducers } from 'redux'
import newArrival from './newArrival'
import allProducts from './allProducts'
import user from './user'
import cart from './cart'
import receiver from './receiver'
import recommend from './recommend'
import orders from './orders'

export default combineReducers({
    newArrival,
    allProducts,
    user,
    cart,
    receiver,
    recommend,
    orders
})