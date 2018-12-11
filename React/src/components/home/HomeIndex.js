import React, { Component } from 'react'
import Slide from './Slide'
import NewArrival from './NewArrival'

class HomeIndex extends Component {
  render() {
    return (
      <>
        <Slide />
        <NewArrival {...this.props} />
        <div className="lorem">
          <div className="upper">
            <div className="img-wrapper">
              <img
                src="https://sunglassstore.oss-cn-hangzhou.aliyuncs.com/banners/layer1.png"
                alt="img"
              />
            </div>
            <div className="text">
              <h2>
                The Difference is
                <br />
                in The Lens
              </h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="img-wrapper">
              <img
                src="https://sunglassstore.oss-cn-hangzhou.aliyuncs.com/banners/layer2.png"
                alt="img"
              />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default HomeIndex
