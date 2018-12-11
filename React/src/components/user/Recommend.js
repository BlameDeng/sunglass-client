import React, { Component } from 'react'
import Sku from '../Sku'
import * as api from '../../api'

class Recommend extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    api
      .getRecommend((this.props.user && this.props.user.gender) || '')
      .then(res => {
        this.props.setRecommend(res.data)
      })
      .catch(err => {})
  }

  render() {
    const { recommend } = this.props
    return (
      <div className="recommend-wrapper">
        <h4 className="title">猜你喜欢</h4>
        <div className="recommend">
          {recommend && recommend.length
            ? recommend.map(product => (
                <Sku product={product} key={product.id} {...this.props} />
              ))
            : ''}
        </div>
      </div>
    )
  }
}

export default Recommend
