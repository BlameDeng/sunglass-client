import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as api from '../../api'
// import { Input, Icon } from 'antd'
const { Input, Icon }=window.antd

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errMsg: '',
      username: '',
      password: '',
      isLogining: false
    }
  }

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value
    })
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  handleFocus() {
    if (this.state.errMsg) {
      this.setState({
        errMsg: ''
      })
    }
  }

  handleSubmit() {
    if (this.state.isLogining) {
      return
    }
    const { username, password } = this.state
    if (!username || !password) {
      this.setState({ errMsg: '用户名或密码不能为空' })
      return
    }
    const pattern1 = /^[\u4e00-\u9fa5\w]{5,10}$/
    const pattern2 = /.{6,18}/
    if (!pattern1.test(username)) {
      this.setState({ errMsg: '账户名为5到10个字符' })
      return
    }
    if (!pattern2.test(password)) {
      this.setState({ errMsg: '密码为6到18个字符' })
      return
    }
    this.setState({
      isLogining: true
    })
    api
      .login(username, password)
      .then(res => {
        if (res.token) {
          localStorage.setItem('user', res.token)
        }
        const { username, nickyname, gender, cart } = res.data
        this.props.login({ username, nickyname, gender })
        this.props.setCart(cart)
      })
      .catch(err => {
        this.setState({
          errMsg: err.msg,
          isLogining: false
        })
      })
  }

  render() {
    const errMsg = this.state.errMsg
    return (
      <div className="user-login">
        <div className="link">
          <Link to="/" className="logo">
            Sunglass <sup> &reg; </sup>
          </Link>
        </div>
        <div className="login-wrapper">
          <div className="login">
            <div className="title">
              <h2> 账户登录 </h2>
            </div>
            {errMsg ? (
              <div className="error">
                <Icon
                  type="close-circle"
                  style={{ color: '#f10215', marginRight: '5px' }}
                />
                {errMsg}
              </div>
            ) : (
              ''
            )}
            <div className="username">
              <Input
                placeholder="请输入用户名"
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                value={this.state.username}
                onChange={this.handleUsernameChange.bind(this)}
                onFocus={this.handleFocus.bind(this)}
              />
            </div>
            <div className="password">
              <Input
                type="password"
                placeholder="请输入密码"
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                value={this.state.password}
                onChange={this.handlePasswordChange.bind(this)}
                onFocus={this.handleFocus.bind(this)}
              />
            </div>
            <div className="submit">
              <button onClick={this.handleSubmit.bind(this)}> 登录 </button>
            </div>
            <div className="tips"> 如果账户未注册， 将自动为您注册 </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
