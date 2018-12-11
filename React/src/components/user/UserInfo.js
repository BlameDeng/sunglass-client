import React, { Component } from 'react'
import Header from '../Header'
import UserNav from './UserNav'
import UserProfile from './UserProfile'
import UserAccount from './UserAccount'
import Recommend from './Recommend'

class UserInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tab: 'profile'
    }
  }

  changeTab(tab) {
    if (tab !== this.state.tab) {
      this.setState({ tab })
    }
  }

  render() {
    return (
      <div className="user-info">
        <Header />
        <UserNav
          {...this.props}
          tab={this.state.tab}
          changeTab={this.changeTab.bind(this)}
        />
        {this.state.tab === 'profile' ? (
          <UserProfile {...this.props} />
        ) : (
          <UserAccount {...this.props} />
        )}
        <Recommend {...this.props}> </Recommend>
      </div>
    )
  }
}

export default UserInfo
