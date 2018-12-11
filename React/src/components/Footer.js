import React, { Component } from 'react'
import {Link} from 'react-router-dom'
// import { Icon } from 'antd'
const { Icon }=window.antd

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="footer-inner">
          <div className="link">
            <Link to="/" className="logo">
              Sunglass<sup>&reg;</sup>
            </Link>
            <div className="icons">
              <a
                href="https://github.com/BlameDeng"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon type="github" />
              </a>
            </div>
          </div>
          <div className="portfolio">
            <div>Portfolio</div>
            <a
              href="https://xue-ui.com.cn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Xue-ui
            </a>
            <a
              href="https://blamedeng.github.io/EasyChat"
              target="_blank"
              rel="noopener noreferrer"
            >
              EasyChat
            </a>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
