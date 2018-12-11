 import * as api from '../api'

 const requestNewArrival = () => ({
     type: 'REQUEST_NEWARRIVAL',
     payload: {
         isFetching: true,
         data: null
     }
 })

 const receiveNewArrival = (data) => ({
     type: 'RECEIVE_NEWARRIVAL',
     payload: {
         isFetching: false,
         data
     }
 })

 export default function getNewArrival() {
     return dispatch => {
         dispatch(requestNewArrival())
         return api.getNewArrival()
             .then(res => {
                 dispatch(receiveNewArrival(res.data))
             })
     }
 }