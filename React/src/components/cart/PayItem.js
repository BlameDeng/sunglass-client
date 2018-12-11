import React, { Component } from 'react'

class PayItem extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { product } = this.props
    return (
      <li>
        <div className="info">
          <img src={product.main_image} alt="main" />
          <span>{product.title}</span>
        </div>
        <div className="price">
          <span className="text">单价</span>
          <span>￥{product.discount.toFixed(2)}</span>
          {product.discount < product.price ? (
            <span className="origin">
              <span className="text">原价</span>￥{product.price.toFixed(2)}
            </span>
          ) : (
            ''
          )}
        </div>
        <div className="count">
          <span className="text">数量</span>
          {product.count}
        </div>
        <div className="total">
          <span className="text">小计</span>￥{(product.discount*product.count).toFixed(2)}
        </div>
      </li>
    )
  }
}

export default PayItem
