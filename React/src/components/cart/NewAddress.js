import React, { Component } from 'react'
import * as api from '../../api'
// import { Input, message } from 'antd'
const { Input, message }=window.antd

class NewAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      phone: '',
      address: '',
      detail: '',
      isChanging: false
    }
  }

  handleName(e) {
    this.setState({
      name: e.target.value
    })
  }

  handlePhone(e) {
    this.setState({
      phone: e.target.value
    })
  }

  handleAddress(e) {
    this.setState({
      address: e.target.value
    })
  }

  handleDetail(e) {
    this.setState({
      detail: e.target.value
    })
  }

  handleSubmit() {
    const { name, phone, address, detail, isChanging } = this.state
    if (isChanging) {
      return
    }
    if (!name || !phone || !address || !detail) {
      message.info('收货人信息不能为空', 2)
      return
    }
    this.setState({ isChanging: true })
    api
      .updateReceiver(name, phone, address, detail)
      .then(res => {
        this.setState({
          name: '',
          phone: '',
          address: '',
          detail: '',
          isChanging: false
        })
        this.props.updateReceiver(res.data)
        this.props.closeNewAddress('address')
      })
      .catch(() => {
        this.setState({
          isChanging: false
        })
      })
  }

  render() {
    const { name, phone, address, detail } = this.state
    return (
      <div className="mask">
        <div className="dialog">
          <div className="address">
            <div className="info">使用新地址</div>
            <div className="wrapper">
              <p>
                <label>收货人：</label>
                <Input value={name} onChange={this.handleName.bind(this)} />
              </p>
              <p>
                <label>手机号码：</label>
                <Input value={phone} onChange={this.handlePhone.bind(this)} />
              </p>
            </div>
            <p>
              <label>地址信息：</label>
              <Input
                value={address}
                onChange={this.handleAddress.bind(this)}
                placeholder="省/市/区"
              />
            </p>
            <p>
              <label>详细地址：</label>
              <Input
                value={detail}
                onChange={this.handleDetail.bind(this)}
                placeholder="详细地址，如：门牌、街道、村镇"
              />
            </p>
          </div>
          <div className="btn-wrapper">
            <div
              className="btn cancle"
              role="button"
              onClick={() => this.props.closeNewAddress('address')}
            >
              取消
            </div>
            <div
              className="btn"
              role="button"
              onClick={this.handleSubmit.bind(this)}
            >
              保存
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default NewAddress
