import React, { Component } from 'react'
import * as api from '../../api'
// import { Spin } from 'antd'
const { Spin } = window.antd

class NewArrival extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAdding: false
    }
  }

  componentDidMount() {
    !this.props.newArrival.data && this.props.getNewArrival()
  }

  handleClickProduct(id) {
    this.props.history.push('/product/' + id)
  }

  handleClickAdd(e, id) {
    e.stopPropagation()
    const { user, history } = this.props
    if (!user) {
      history.push('/user')
      return
    }
    if (this.state.isAdding) {
      return
    }
    const products = this.props.cart.products || []
    const item = products.find(item => item.id === id)
    if (item) {
      return
    }
    this.setState({
      isAdding: true
    })
    api
      .addToCart({ id, count: 1 })
      .then(res => {
        this.props.setCart(res.data)
        this.setState({
          isAdding: false
        })
      })
      .catch(() => {
        this.setState({
          isAdding: false
        })
      })
  }

  render() {
    const { isFetching, data } = this.props.newArrival
    return (
      <div className="new-arrival">
        <h1 className="title"> New Arrival </h1>
        <div className="product-wrapper">
          {isFetching ? (
            <div className="spin-wrapper">
              <Spin size="large" />
            </div>
          ) : (
            ''
          )}
          {data && data.length
            ? data.map(product => (
                <div
                  className="product"
                  key={product.id}
                  onClick={() => this.handleClickProduct(product.id)}
                >
                  <h2 className="name"> {product.name} </h2>
                  <img src={product.sub_image} alt="product" />
                  <span className="price"> ￥{product.discount.toFixed(2)} </span>
                  <div
                    className="add"
                    onClick={e => this.handleClickAdd(e, product.id)}
                  >
                    添加到购物车
                  </div>
                </div>
              ))
            : ''}
        </div>
      </div>
    )
  }
}

export default NewArrival
