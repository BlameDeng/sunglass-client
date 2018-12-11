import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from '../components/user/Login'
import {
  login,
  changeProfile,
  setCart,
  setReceiver,
  updateReceiver,
  setRecommend
} from '../actions'
import UserInfo from '../components/user/UserInfo'
import TopBar from '../components/TopBar'

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const user = this.props.user
    return (
      <>
        <TopBar {...this.props}> </TopBar>
        {user ? (
          <UserInfo {...this.props}> </UserInfo>
        ) : (
          <Login {...this.props} />
        )}
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  receiver: state.receiver,
  recommend: state.recommend
})

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user)),
  setCart: cart => dispatch(setCart(cart)),
  changeProfile: (nickyname, gender) =>
    dispatch(changeProfile(nickyname, gender)),
  setReceiver: receiver => dispatch(setReceiver(receiver)),
  updateReceiver: receiver => dispatch(updateReceiver(receiver)),
  setRecommend: recommed => dispatch(setRecommend(recommed))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User)
