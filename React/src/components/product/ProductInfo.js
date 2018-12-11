import React, { Component } from 'react'
import * as api from '../../api'
// import { Icon } from 'antd'
const { Icon } = window.antd

class ProductInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tab: 'main',
      count: 1,
      isAdding: false
    }
  }

  handleMouseEnter(tab) {
    tab !== this.state.tab && this.setState({ tab })
  }

  handleSize(node) {
    if (node) {
      const { width } = node.getBoundingClientRect()
      node.style.height = width + 'px'
    }
  }

  handleCountChange(e) {
    const count = parseInt(e.target.value)
    if (count && count > 0) {
      this.setState({
        count
      })
    }
  }

  handleBtn(n) {
    if (this.state.count + n > 0) {
      this.setState({
        count: this.state.count + n
      })
    }
  }

  handleAddToCart(link) {
    const { user, history } = this.props
    if (!user) {
      history.push('/user')
      return
    }
    if (this.state.isAdding) {
      return
    }
    const { count } = this.state
    const { id } = this.props.product
    const { products } = this.props.cart
    const item = products.find(item => item.id === id)
    if (item) {
      if (count > item.count) {
        this.setState({ isAdding: true })
        api
          .addToCart({ id, count, type: 'changeCount' })
          .then(res => {
            this.props.setCart(res.data)
            this.setState({ isAdding: false })
            if (link) {
              this.props.history.push('/cart')
            }
          })
          .catch(() => {
            this.setState({ isAdding: false })
          })
      } else {
        if (link) {
          this.props.history.push('/cart')
        }
        return
      }
    } else {
      this.setState({ isAdding: true })
      api
        .addToCart({ id, count })
        .then(res => {
          this.props.setCart(res.data)
          this.setState({ isAdding: false })
          if (link) {
            this.props.history.push('/cart')
          }
        })
        .catch(() => {
          this.setState({ isAdding: false })
        })
    }
  }

  handleBuy() {
    this.handleAddToCart(true)
  }

  render() {
    const { product, history } = this.props
    const { tab, count } = this.state
    return (
      <>
        <div className="tags-bar">
          <div className="tag" onClick={() => history.push('/')}>
            首页
          </div>
          <Icon type="right" />
          <div className="tag" onClick={() => history.push('/')}>
            全部
          </div>
          <Icon type="right" />
          {product ? (
            product.category === 'male' ? (
              <div className="tag" onClick={() => history.push('/')}>
                男士
              </div>
            ) : (
              <div className="tag" onClick={() => history.push('/')}>
                女士
              </div>
            )
          ) : (
            ''
          )}
          <Icon type="right" />
          <div className="tag">{product && product.name}</div>
        </div>
        <div className="content">
          <div className="imgs">
            <div className="show-img" ref={node => this.handleSize(node)}>
              {tab === 'main' ? (
                <img src={product && product.main_image} alt="main" />
              ) : (
                <img src={product && product.sub_image} alt="sub" />
              )}
            </div>
            <div className="focus-img">
              <div
                className={`cover ${tab === 'main' ? 'active' : ''}`}
                onMouseEnter={() => {
                  this.handleMouseEnter('main')
                }}
              >
                <img src={product && product.main_image} alt="main" />
              </div>
              <div
                className={`feature ${tab === 'sub' ? 'active' : ''}`}
                onMouseEnter={() => {
                  this.handleMouseEnter('sub')
                }}
              >
                <img src={product && product.sub_image} alt="sub" />
              </div>
            </div>
          </div>
          <div className="goods-wrapper">
            <div className="goods-info">
              <div className="title">
                <h2 className="main-title">{product && product.title}</h2>
                <h4 className="sub-title">品牌授权 正品保障 急速物流</h4>
              </div>
              <div className="goods-price">
                {product ? (
                  product.discount < product.price ? (
                    <>
                      <div className="origin-price">
                        <span className="label w3">参考价</span>
                        <span>￥{product && product.price.toFixed(2)}</span>
                      </div>
                      <div className="price">
                        <span className="label w3">优惠价</span>
                        <span>￥</span>
                        <span className="number">
                          {product && product.discount}
                        </span>
                        <span>.00</span>
                      </div>
                    </>
                  ) : (
                    <div className="price">
                      <span className="label w2">价格</span>
                      <span>￥</span>
                      <span className="number">
                        {product && product.discount}
                      </span>
                      <span>.00</span>
                    </div>
                  )
                ) : (
                  ''
                )}
                <div className="ems">
                  <span className="label w2">快递</span>
                  <span>EMS</span>
                  <span className="number"> 0.00 </span>
                  <span>免运费</span>
                </div>
              </div>
              <div className="count">
                <div className="label w2">数量</div>
                <span
                  className={`minus ${count === 1 ? 'disabled' : ''}`}
                  onClick={() => this.handleBtn(-1)}
                >
                  -
                </span>
                <input
                  type="text"
                  value={count}
                  onChange={this.handleCountChange.bind(this)}
                />
                <span className="plus" onClick={() => this.handleBtn(1)}>
                  +
                </span>
                <span className="remain">库存充足</span>
              </div>
              <div className="service">
                <div className="label w2">服务</div>
                <span>七天无理由退货</span>
              </div>
            </div>
            <div className="actions">
              <div
                className="pay"
                role="button"
                onClick={this.handleBuy.bind(this)}
              >
                立即购买
              </div>
              <div
                className="add-to-cart"
                role="button"
                onClick={() => this.handleAddToCart()}
              >
                加入购物车
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default ProductInfo
