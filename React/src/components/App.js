import React, { Component } from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import Footer from './Footer'
import Sider from './Sider'
import Home from '../containers/Home'
import User from '../containers/User'
import Cart from '../containers/Cart'
import Product from '../containers/Product'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/user" component={User} />
          <Route path="/cart" component={Cart} />
          <Route path="/product/:id" component={Product} />
           <Sider />
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
