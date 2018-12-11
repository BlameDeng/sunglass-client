import React, { Component } from 'react'
// import { Carousel } from 'antd'
const { Carousel }=window.antd

class Slide extends Component {
  render() {
    return (
      <div className="home-slides">
        <Carousel autoplay dots={false}>
          <div className="slide">
            <img
              src="https://sunglassstore.oss-cn-hangzhou.aliyuncs.com/banners/banner1.jpg"
              alt="banner"
            />
          </div>
          <div className="slide">
            <img
              src="https://sunglassstore.oss-cn-hangzhou.aliyuncs.com/banners/banner2.jpg"
              alt="banner"
            />
          </div>
          <div className="slide">
            <img
              src="https://sunglassstore.oss-cn-hangzhou.aliyuncs.com/banners/banner3.jpg"
              alt="banner"
            />
          </div>
        </Carousel>
      </div>
    )
  }
}

export default Slide
