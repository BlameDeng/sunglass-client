import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { smoothScroll } from '../utils/smoothScroll'
// import { Icon } from 'antd'
const { Icon }=window.antd

class Sider extends Component {
  handleScrollToTop() {
    smoothScroll(window, { x: 0, y: 0 })
  }

  render() {
    const cart = this.props.cart
    return (
      <div className="sider">
        <div className="link">
          <div className="user">
            <Link to="/user">
              <Icon type="user" />
            </Link>
          </div>
          <Link to="/cart">
            <div className="cart">
              <Icon type="shopping-cart" />
              <span>
                <span>购</span>
                <span>物</span>
                <span>车</span>
              </span>
              <span className="count">
                {cart && cart.products ? cart.products.length : 0}
              </span>
            </div>
          </Link>
        </div>
        <div className="to-top" onClick={this.handleScrollToTop.bind(this)}>
          TOP
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  user: state.user
})

export default connect(mapStateToProps)(Sider)
