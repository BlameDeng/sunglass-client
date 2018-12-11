import React, { Component } from 'react'
import PropTypes from 'prop-types'

class HomeNavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryIndex: 0
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const tabs = ['index', 'all', 'female', 'male', 'discount']
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i] === nextProps.category) {
        return { categoryIndex: i }
      }
    }
    return null
  }

  render() {
    const category = this.props.category
    return (
      <div className="home-nav-bar-wrapper">
        <div className="home-nav-bar">
          <div className="logo">
            Sunglass<sup>&reg;</sup>
          </div>
          <nav className="nav-bar">
            <div className="category">
              <div
                className={`item ${category === 'index' ? 'active' : ''}`}
                onClick={() => this.props.changeCategory('index')}
              >
                首页
              </div>
              <div
                className={`item ${category === 'all' ? 'active' : ''}`}
                onClick={() => this.props.changeCategory('all')}
              >
                全部
              </div>
              <div
                className={`item ${category === 'female' ? 'active' : ''}`}
                onClick={() => this.props.changeCategory('female')}
              >
                女士
              </div>
              <div
                className={`item ${category === 'male' ? 'active' : ''}`}
                onClick={() => this.props.changeCategory('male')}
              >
                男士
              </div>
              <div
                className={`item ${category === 'discount' ? 'active' : ''}`}
                onClick={() => this.props.changeCategory('discount')}
              >
                特惠
              </div>
              <div
                className="slider"
                style={{
                  transform: `translateX(${this.state.categoryIndex * 60}px)`
                }}
              />
              <div
                className="fill"
                style={{
                  transform: `translateX(${this.state.categoryIndex * 60}px)`
                }}
              />
            </div>
          </nav>
        </div>
      </div>
    )
  }
}

HomeNavBar.propTypes = {
  category: PropTypes.string.isRequired,
  changeCategory: PropTypes.func.isRequired
}

export default HomeNavBar
