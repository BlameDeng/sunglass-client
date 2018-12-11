import React, { Component } from 'react'
import * as api from '../../api'
import formatDate from '../../utils/formatDate'
// import { message } from 'antd'
const { message }=window.antd

class Evaluation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      evaluation: null,
      tab: 'detail',
      content: '',
      unEvaluated: null,
      isFetching: false
    }
  }

  componentDidMount() {
    const { orders, user } = this.props
    const id = parseInt(this.props.match.params.id)
    //获取商品评论
    api
      .getEvaluation(id)
      .then(res => {
        this.setState({
          evaluation: res.data.sort((prev, next) => next.id - prev.id)
        })
      })
      .catch(() => {})
    if (!user) {
      return
    }
    //获取用户订单
    if (orders) {
      const unEvaluated = this.canEvaluate(id)
      this.setState({
        unEvaluated
      })
    } else {
      api
        .getOrders()
        .then(res => {
          this.props.setOrders(res.data)
          const unEvaluated = this.canEvaluate(id)
          this.setState({
            unEvaluated
          })
        })
        .catch(() => {})
    }
  }

  canEvaluate(id) {
    const { orders } = this.props
    return orders.find(
      order => order.status === 'toEvaluate' && order.product.id === id
    )
  }

  handleClickTab(tab) {
    if (this.state.tab !== tab) {
      this.setState({ tab })
    }
  }

  handleTextarea(e) {
    this.setState({
      content: e.target.value
    })
  }

  handleSubmit() {
    const { content, unEvaluated, isFetching } = this.state
    if (isFetching) {
      return
    }
    const { user, setOrders } = this.props
    if (!content) {
      message.info('评论内容不能为空', 2)
      return
    }
    this.setState({
      isFetching: true
    })
    api
      .createEvaluation({
        pid: unEvaluated.product.id,
        oid: unEvaluated.id,
        username: user.username,
        nickyname: user.nickyname || '',
        content
      })
      .then(res => {
        this.setState({
          isFetching: false,
          evaluation: res.data.sort((prev, next) => next.id - prev.id),
          unEvaluated: null
        })
      })
      .then(() => {
        return api.getOrders()
      })
      .then(res => {
        setOrders(res.data)
      })
      .catch(() => {
        this.setState({
          isFetching: false
        })
      })
  }

  render() {
    const { evaluation, tab, content, unEvaluated } = this.state
    const { product } = this.props
    return (
      <div className="detail-container">
        <ul
          className={`navbar ${tab === 'detail' ? 'active' : ''}`}
          style={{ marginBottom: 0 }}
        >
          <li
            onClick={() => this.handleClickTab('detail')}
            className={tab === 'detail' ? 'active' : ''}
          >
            商品详情
          </li>
          <li
            onClick={() => this.handleClickTab('evaluation')}
            className={tab === 'evaluation' ? 'active' : ''}
          >
            累计评价
            <span className="number">{evaluation && evaluation.length}</span>
          </li>
        </ul>
        <div className="content-area">
          {tab === 'detail' ? (
            <div className="detail">
              {product &&
                product.detail.split('\n').map((item, index) => (
                  <p className="detail-item" key={index}>
                    {item}
                  </p>
                ))}
            </div>
          ) : (
            <div className="evaluation">
              {unEvaluated ? (
                <div className="add-evaluation">
                  <h2>其他买家，需要你的建议哦！</h2>
                  <div className="textarea-wrapper">
                    <textarea
                      value={content}
                      onChange={this.handleTextarea.bind(this)}
                    />
                    <span className="tips">
                      <span>{content.length}</span> / 300
                    </span>
                  </div>
                  <div className="action">
                    <div
                      className="btn"
                      role="button"
                      onClick={this.handleSubmit.bind(this)}
                    >
                      提交评价
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
              <ul className="content">
                {evaluation && evaluation.length ? (
                  evaluation.map(item => (
                    <li className="comment" key={item.id}>
                      <div className="user">
                        <div className="avatar">
                          <img
                            src={require('../../style/img/avatar.png')}
                            alt="avatar"
                          />
                        </div>
                        <span className="username">
                          {item.nickyname || item.username}
                        </span>
                        <span className="time">
                          {formatDate(item.createdAt)}
                        </span>
                      </div>
                      <p className="evaluation-content">{item.content}</p>
                    </li>
                  ))
                ) : (
                  <li>
                    <span>该商品还没有评论</span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Evaluation
