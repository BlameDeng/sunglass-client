import React, { Component } from 'react'
import * as api from '../api'
// import { Icon } from 'antd'
const { Icon } = window.antd

class Sku extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgTab: 'main',
      imgHeight: 0,
      isAdding: false
    }
  }

  handleMouseEnter(imgTab) {
    this.setState({ imgTab })
  }

  handleAddToCart(id) {
    const { user, history } = this.props
    if (!user) {
      history.push('/user')
      return
    }
    if (this.state.isAdding) {
      return
    }
    if (
      this.props.cart &&
      this.props.cart.products &&
      this.props.cart.products.length
    ) {
      if (this.props.cart.products.find(product => product.id === id)) {
        return
      } else {
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
          .catch(err => {
            this.setState({
              isAdding: false
            })
          })
      }
    } else {
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
        .catch(err => {
          this.setState({
            isAdding: false
          })
        })
    }
  }

  handleOnDetail(id) {
    this.props.history.push('/product/' + id)
  }

  render() {
    const { product } = this.props
    return (
      <div
        className="sku"
        style={{ margin: `0 ${Math.floor(this.props.margin)}px` }}
      >
        <div className="show-img">
          {this.state.imgTab === 'main' ? (
            <img src={product.main_image} alt="main" ref={this.mainImg} />
          ) : (
            <img src={product.sub_image} alt="sub" />
          )}
        </div>
        <div className="focus-img">
          <div
            className={`cover ${this.state.imgTab === 'main' ? 'active' : ''}`}
          >
            <img
              src={product.main_image}
              alt="main"
              onMouseEnter={() => this.handleMouseEnter('main')}
            />
          </div>
          <div
            className={`feature ${this.state.imgTab === 'sub' ? 'active' : ''}`}
          >
            <img
              src={product.sub_image}
              alt="sub"
              onMouseEnter={() => this.handleMouseEnter('sub')}
            />
          </div>
        </div>
        <div className="goods-price">
          <div className="price">
            <span>￥</span>
            <span className="number">{product.discount}</span>
            <span>.00</span>
          </div>
          {product.discount < product.price ? (
            <div className="origin-price">
              <span>￥{product.price.toFixed(2)}</span>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="title">{product.title}</div>
        <div className="actions">
          <div
            className="detail"
            role="button"
            onClick={() => this.handleOnDetail(product.id)}
          >
            <Icon type="file-search" />
            查看详情
          </div>
          <div
            className="add-to-cart"
            role="button"
            onClick={() => this.handleAddToCart(product.id)}
          >
            <Icon type="shopping-cart" />
            加入购物车
          </div>
        </div>
      </div>
    )
  }
}

export default Sku
