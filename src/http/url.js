const prefix = 'http://localhost:8000'
const URL = {
    newArrival: `${prefix}/product/newarrival`,
    allProducts: `${prefix}/product/allproducts`,
    singleProduct: `${prefix}/product/singleProduct`,
    recommend: `${prefix}/product/recommend`,
    login: `${prefix}/auth/login`,
    check: `${prefix}/auth/check`,
    logout: `${prefix}/auth/logout`,
    changePassword: `${prefix}/auth/changepassword`,
    changeProfile: `${prefix}/auth/changeprofile`,
    addToCart: `${prefix}/cart/addtocart`,
    removeFromCart: `${prefix}/cart/removefromcart`,
    changeProductCount: `${prefix}/cart/changeproductcount`,
    getReceiver: `${prefix}/receiver/getreceiver`,
    updateReceiver: `${prefix}/receiver/updatereceiver`,
    pay: `${prefix}/order/payment`,
    getOrder: `${prefix}/order/getorder`,
    changeOrderStatus: `${prefix}/order/changeorderstatus`,
    deleteOrder: `${prefix}/order/deleteorder`,
    getEvaluation: `${prefix}/evaluation/getevaluation`,
    createEvaluation: `${prefix}/evaluation/createevaluation`,
}
export default URL