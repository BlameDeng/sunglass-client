import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as api from '../../api'

class CartItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      isChanging: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { product } = nextProps
    const { count } = prevState
    if (product && product.count && !count) {
      return { count: product.count }
    }
    return null
  }

  handleCountChange(e) {
    if (e === 'plus') {
      this.changeCount(this.state.count + 1)
    } else if (e === 'minus') {
      if (this.state.count > 1) {
        this.changeCount(this.state.count - 1)
      }
    } else {
      const value = parseInt(e.target.value)
      if (value > 0) {
        this.changeCount(value)
      }
    }
  }

  changeCount(count) {
    if (this.state.isChanging) {
      return
    }
    this.setState({
      isChanging: true
    })
    const { product } = this.props
    api
      .addToCart({ id: product.id, count, type: 'changeCount' })
      .then(res => {
        this.props.setCart(res.data)
        this.setState({
          count,
          isChanging: false
        })
      })
      .catch(() => {
        this.setState({
          isChanging: false
        })
      })
  }

  handleRemove() {
    if (this.state.isChanging) {
      return
    }
    this.setState({
      isChanging: true
    })
    api
      .removeFromCart({ id: this.props.product.id })
      .then(res => {
        this.setState({
          isChanging: false
        })
        this.props.setCart(res.data)
      })
      .catch(() => {
        this.setState({
          isChanging: false
        })
      })
  }

  render() {
    const { product, selectedIds, history } = this.props
    return (
      <li>
        <div className="label">
          <label
            className={
              selectedIds && selectedIds.indexOf(product.id) > -1
                ? 'selected'
                : ''
            }
            onClick={() => this.props.handleClickItem(product.id)}
          />
        </div>
        <div className="info">
          <img
            src={product.main_image}
            alt="main"
            onClick={() => history.push('/product/' + product.id)}
          />
          <span onClick={() => history.push('/product/' + product.id)}>
            {product.title}
          </span>
        </div>
        <div className="price">
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
          <span
            className={`minus ${this.state.count <= 1 ? 'disabled' : ''}`}
            onClick={() => this.handleCountChange('minus')}
          >
            -
          </span>
          <input
            type="text"
            value={this.state.count}
            onChange={this.handleCountChange.bind(this)}
          />
          <span className="plus" onClick={() => this.handleCountChange('plus')}>
            +
          </span>
        </div>
        <div className="total">
          <span>小计</span>￥{(product.discount * product.count).toFixed(2)}
        </div>
        <div className="action">
          <span onClick={this.handleRemove.bind(this)}>删除</span>
        </div>
      </li>
    )
  }
}

CartItem.propTypes = {
  product: PropTypes.object.isRequired
}

export default CartItem
