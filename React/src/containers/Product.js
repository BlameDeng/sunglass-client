import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setCart, setOrders } from '../actions'
import * as api from '../api'
import ProductInfo from '../components/product/ProductInfo'
import Evaluation from '../components/product/Evaluation'
import TopBar from '../components/TopBar'

class Product extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: null
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params
    if (id) {
      api
        .getSingleProduct(parseInt(id))
        .then(res => {
          this.setState({
            product: res.data
          })
        })
        .catch(() => {
          this.props.history.push('/')
        })
    }
  }

  render() {
    return (
      <>
        <TopBar {...this.props}> </TopBar>
        <main className="main-product">
          <ProductInfo {...this.props} product={this.state.product} />
          <Evaluation {...this.props} product={this.state.product} />
        </main>
      </>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  orders: state.orders,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  setCart: cart => dispatch(setCart(cart)),
  setOrders: orders => dispatch(setOrders(orders))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product)
