import React, { Component } from 'react'
import CartItem from './CartItem'

class MyCart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedIds: null,
      all: false,
      total: 0
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { cart } = nextProps
    const { selectedIds } = prevState
    if (cart && cart.products && cart.products.length) {
      if (selectedIds && selectedIds.length) {
        const total = cart.products.reduce((prev, current) => {
          //选中的
          if (selectedIds.indexOf(current.id) > -1) {
            return prev + current.discount * current.count
            //未选中的
          } else {
            return prev
          }
        }, 0)
        return { total }
      } else {
        return { total: 0 }
      }
    } else {
      return { total: 0 }
    }
  }

  handleClickItem(id) {
    const ids = this.state.selectedIds || []
    const index = ids.indexOf(id)
    if (index === -1) {
      ids.push(id)
    } else {
      ids.splice(index, 1)
    }
    if (this.equals(ids)) {
      this.setState({
        selectedIds: ids,
        all: true
      })
    } else {
      this.setState({
        selectedIds: ids,
        all: false
      })
    }
  }

  handleClickSelectAll() {
    const { cart } = this.props
    //购物车为空，直接return
    if (!cart || !cart.products || !cart.products.length) {
      return
    }
    //ids相等，已全选，则反选
    if (this.equals(this.state.selectedIds)) {
      this.cancleAll()
    }
    //ids不等，未全选，则全选
    else {
      this.selectAll()
    }
  }

  //判断传入的ids数组是否和cart中所有product的id数组相同
  equals(ids) {
    //元素都是number
    if (!ids) {
      return false
    }
    const cartIds = this.props.cart.products.map(product => product.id).sort()
    const selectedIds = JSON.parse(JSON.stringify(ids)).sort()
    if (cartIds.length !== selectedIds.length) {
      return false
    }
    for (let i = 0; i < cartIds.length; i++) {
      if (cartIds[i] !== selectedIds[i]) {
        return false
      }
    }
    return true
  }

  selectAll() {
    this.setState({
      selectedIds: this.props.cart.products.map(product => product.id),
      all: true
    })
  }

  cancleAll() {
    this.setState({
      selectedIds: null,
      all: false
    })
  }

  handleOnPay() {
    const { selectedIds, total } = this.state
    if (!selectedIds || !selectedIds.length) {
      return
    }
    this.props.handleChangeTab('payment', selectedIds, total)
  }

  render() {
    const { cart } = this.props
    const { selectedIds } = this.state
    return (
      <div className="my-cart">
        <div className="title">我的购物车</div>
        <ul className="title-bar">
          <li className="label">
            <label
              onClick={this.handleClickSelectAll.bind(this)}
              className={this.state.all ? 'selected' : ''}
            />
            <span onClick={this.handleClickSelectAll.bind(this)}>全选</span>
          </li>
          <li className="info">商品信息</li>
          <li className="price">单价</li>
          <li className="count">数量</li>
          <li>金额</li>
          <li className="action">操作</li>
        </ul>
        <ul className="goods">
          {cart && cart.products && cart.products.length ? (
            cart.products.map(product => (
              <CartItem
                product={product}
                key={product.id}
                {...this.props}
                selectedIds={this.state.selectedIds}
                handleClickItem={this.handleClickItem.bind(this)}
              />
            ))
          ) : (
            <li className="else">购物车是空的哦~~~</li>
          )}
        </ul>
        <ul className="action-bar">
          <li className="label">
            <label
              onClick={this.handleClickSelectAll.bind(this)}
              className={this.state.all ? 'selected' : ''}
            />
            <span onClick={this.handleClickSelectAll.bind(this)}>全选</span>
          </li>
          <li className="info" />
          <li className="count">
            已选商品
            <span className="number">
              {(this.state.selectedIds && this.state.selectedIds.length) || 0}
            </span>
            件
          </li>
          <li className="total">
            合计<span className="number">{this.state.total.toFixed(2)}</span>
          </li>
          <li
            className={`pay ${
              !selectedIds || !selectedIds.length ? 'disabled' : ''
            }`}
            onClick={this.handleOnPay.bind(this)}
          >
            结 算
          </li>
        </ul>
      </div>
    )
  }
}

export default MyCart
