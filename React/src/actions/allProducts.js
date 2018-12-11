 import * as api from '../api'

 const requestAllProducts = () => ({
     type: 'REQUEST_ALLPRODUCTS',
     payload: {
         isFetching: true,
         data: null
     }
 })

 const receiveAllProducts = (data) => ({
     type: 'RECEIVE_ALLPRODUCTS',
     payload: {
         isFetching: false,
         data
     }
 })

 export default function getAllProducts() {
     return dispatch => {
         dispatch(requestAllProducts())
         api.getAllProducts()
             .then(res => {
                 dispatch(receiveAllProducts(res.data))
             })
     }
 }