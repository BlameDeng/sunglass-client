import React, { Component } from 'react'
import formatDate from '../../utils/formatDate'
import * as api from '../../api'
// import { Icon, message } from 'antd'
const { Icon, message }=window.antd

class OrderItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isChanging: false
    }
  }

  handleDelivery() {
    if (this.state.isChanging) {
      return
    }
    this.setState({
      isChanging: true
    })
    api
      .changeOrderStatus({ order: this.props.order, status: 'toEvaluate' })
      .then(res => {
        this.setState({
          isChanging: false
        })
        this.props.setOrders(res.data.sort((prev, next) => next.id - prev.id))
      })
      .catch(err => {
        message.error(err.msg, 2)
        this.setState({
          isChanging: false
        })
      })
  }

  handleDelete(id) {
    if (this.state.isChanging) {
      return
    }
    this.setState({
      isChanging: true
    })
    api
      .deleteOrder(id)
      .then(res => {
        this.setState({
          isChanging: false
        })
        this.props.setOrders(res.data.sort((prev, next) => next.id - prev.id))
      })
      .catch(err => {
        message.error(err.msg, 2)
        this.setState({
          isChanging: false
        })
      })
  }

  render() {
    const { order, history } = this.props
    const { product } = order
    return (
      <li>
        <header className="order-info">
          <span className="number">{formatDate(order.createdAt)}</span>
          <span>订单号：</span>
          <span className="number">{order.id}</span>
        </header>
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
          <span className="text">&times;</span>
          {product.count}
        </div>
        <div className="total">
          ￥{(product.discount * product.count).toFixed(2)}
        </div>
        <div className="action">
          {order.status === 'toConfirm' ? (
            <div
              className="btn delivery"
              onClick={this.handleDelivery.bind(this)}
            >
              确认收货
            </div>
          ) : (
            ''
          )}
          {order.status === 'toEvaluate' ? (
            <div
              className="btn"
              onClick={() => history.push('/product/' + product.id)}
            >
              评价商品
            </div>
          ) : (
            ''
          )}
          {order.status === 'done' ? (
            <div className="btn" onClick={() => this.handleDelete(order.id)}>
              <Icon type="delete" style={{ marginRight: '3px' }} />
              删除订单
            </div>
          ) : (
            ''
          )}
        </div>
      </li>
    )
  }
}

export default OrderItem
