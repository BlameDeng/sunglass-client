import React, { Component } from 'react'

class UserNav extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { user, tab } = this.props
    return (
      <nav className="user-navbar">
        <div className="user-avatar">
          <img src={require('../../style/img/avatar.png')} alt="avatar" />
          <span>{user && (user.nickyname || user.username)}</span>
        </div>
        <div
          className={`index ${tab === 'profile' ? 'active' : ''}`}
          onClick={() => this.props.changeTab('profile')}
        >
          我的首页
        </div>
        <div
          className={`account ${tab === 'account' ? 'active' : ''}`}
          onClick={() => this.props.changeTab('account')}
        >
          账户设置
        </div>
      </nav>
    )
  }
}

export default UserNav
