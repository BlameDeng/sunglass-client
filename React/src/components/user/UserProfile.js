import React, { Component } from 'react'
import * as api from '../../api'
// import { Input, Radio, message } from 'antd'
const { Input, Radio, message }=window.antd
const RadioGroup = Radio.Group

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nickyname: '',
      gender: '',
      isChanging: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      (nextProps.user.nickyname || nextProps.user.gender) &&
      (!prevState.nickyname && !prevState.gender)
    ) {
      return {
        nickyname: nextProps.user.nickyname,
        gender: nextProps.user.gender
      }
    }
    return null
  }

  handleNicknameChange(e) {
    this.setState({ nickyname: e.target.value })
  }

  handleGenderChange(e) {
    this.setState({
      gender: e.target.value
    })
  }

  handleSubmit() {
    if (this.state.isChanging) {
      return
    }
    if (!this.state.nickyname) {
      message.error('昵称不能为空', 2)
      return
    }
    const user = this.props.user
    if (
      this.state.nickyname === user.nickyname &&
      this.state.gender === user.gender
    ) {
      return
    }
    this.setState({
      isChanging: true
    })
    api
      .changeProfile(this.state.nickyname, this.state.gender)
      .then(res => {
        const { nickyname, gender } = res.data
        this.props.changeProfile(nickyname, gender)
        this.setState({
          isChanging: false
        })
      })
      .catch(err => {
        message.error(err.msg, 2)
        this.setState({
          isChanging: false
        })
      })
  }

  render() {
    const user = this.props.user
    return (
      <div className="user-profile">
        <h4 className="title">个人资料</h4>
        <div className="user-info">
          <div className="item">
            <label>用户名：</label>
            {user && user.username}
          </div>
          <div className="item">
            <label>昵称：</label>
            <div className="input-wrapper">
              <Input
                value={this.state.nickyname}
                onChange={this.handleNicknameChange.bind(this)}
              />
            </div>
          </div>
          <div className="item">
          <label>性别：</label>
            <RadioGroup
              value={this.state.gender}
              onChange={this.handleGenderChange.bind(this)}
            >
              <Radio value={'male'}>男</Radio>
              <Radio value={'female'}>女</Radio>
            </RadioGroup>
          </div>
        </div>
        <div
          className="btn"
          role="button"
          onClick={this.handleSubmit.bind(this)}
        >
          保存
        </div>
      </div>
    )
  }
}

export default UserProfile
