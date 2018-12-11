import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as api from '../api'
import { login, setCart, setOrders, setReceiver } from '../actions'
// import { Icon } from 'antd'
const { Icon }=window.antd

class TopBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      actionVisible: false
    }
    this.listenDocument = this.listenDocument.bind(this)
  }

  componentDidMount() {
    api
      .check()
      .then(res => {
        const { username, nickyname, gender, cart } = res.data
        this.props.login({ username, nickyname, gender })
        this.props.setCart(cart)
      })
      .catch(() => {})
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.listenDocument)
  }

  handleClick(tab) {
    const { user, history } = this.props
    if (tab === 'cart') {
      history.push('/cart')
    } else {
      if (!user) {
        history.push('/user')
      } else {
        this.setState({
          actionVisible: true
        })
        document.addEventListener('click', this.listenDocument)
      }
    }
  }

  listenDocument() {
    this.setState({
      actionVisible: false
    })
    document.removeEventListener('click', this.listenDocument)
  }

  handleClickAction(tab) {
    if (tab === 'user') {
      this.props.history.push('/user')
    } else {
      api
        .logout()
        .then(() => {
          localStorage.removeItem('user')
          const { login, setCart, setOrders, setReceiver ,history} = this.props
          login(null)
          setCart(null)
          setOrders(null)
          setReceiver(null)
          history.push('/')
        })
        .catch(err => {})
    }
  }

  render() {
    const { cart, user } = this.props
    const { actionVisible } = this.state
    return (
      <div className="top-bar">
        <div className="top-bar-inner">
          <div className="user-info" onClick={() => this.handleClick('user')}>
            <Icon type="user" />
            <span className="username">
              {(user && (user.nickyname || user.username)) || '未登录'}
            </span>
            {actionVisible ? (
              <div className="actions">
                <div
                  className="action"
                  onClick={() => this.handleClickAction('user')}
                >
                  账户管理
                </div>
                <div
                  className="action"
                  onClick={() => this.handleClickAction('logout')}
                >
                  注销登录
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
          <div
            className="top-bar-cart"
            onClick={() => this.handleClick('cart')}
          >
            <Icon type="shopping-cart" />
            <span className="badge">{(cart && cart.products.length) || 0}</span>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user)),
  setCart: cart => dispatch(setCart(cart)),
  setOrders: orders => dispatch(setOrders(orders)),
  setReceiver: receiver => dispatch(setReceiver(receiver))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBar)
