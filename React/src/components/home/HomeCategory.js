import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Sku from '../Sku'

class HomeCategory extends Component {
  constructor(props) {
    super(props)
    this.el = React.createRef()
    this.state = {
      products: null,
      margin: 0
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const category = nextProps.category
    if (
      category &&
      nextProps.allProducts.data &&
      nextProps.allProducts.data.length
    ) {
      const array = nextProps.allProducts.data.filter(product => {
        switch (category) {
          case 'all':
            return product
          case 'female':
          case 'male':
            if (product.category === category) {
              return product
            }
            break
          case 'discount':
            if (product.discount < product.price) {
              return product
            }
            break
          default:
            return product
        }
        return false
      })
      return { products: array }
    } else {
      return null
    }
  }

  componentDidMount() {
    !this.props.allProducts.data && this.props.getAllProducts()
    this.handleSize()
  }

  handleSize() {
    let { width } = this.el.current.getBoundingClientRect()
    let col = Math.floor(width / 300)
    let space = width % 300
    let margin = space / (col * 2)
    this.setState({
      margin
    })
  }

  render() {
    const products = this.state.products
    return (
      <div className="home-category" ref={this.el}>
        {products && products.length
          ? products.map(product => (
              <Sku {...this.props}
                product={product}
                key={product.id}
                margin={this.state.margin}
              />
            ))
          : ''}
      </div>
    )
  }
}

HomeCategory.propTypes = {
  getAllProducts: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired
}

export default HomeCategory
