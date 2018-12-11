import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getNewArrival, getAllProducts,setCart } from '../actions'
import HomeNavBar from '../components/home/HomeNavBar'
import HomeIndex from '../components/home/HomeIndex'
import HomeCategory from '../components/home/HomeCategory'
import TopBar from '../components/TopBar'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category: 'index'
    }
  }

  handleChangeCategory(category) {
    this.setState({ category })
  }

  render() {
    return (
      <>
      <TopBar {...this.props}></TopBar>
      <div className="home">
        <HomeNavBar
          category={this.state.category}
          changeCategory={this.handleChangeCategory.bind(this)}
        />
        {this.state.category === 'index' ? (
          <HomeIndex {...this.props} />
        ) : (
          <HomeCategory {...this.props} category={this.state.category} />
        )}
      </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  newArrival: state.newArrival,
  allProducts: state.allProducts,
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  getNewArrival: () => dispatch(getNewArrival()),
  getAllProducts: () => dispatch(getAllProducts()),
  setCart:cart=>dispatch(setCart(cart))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
