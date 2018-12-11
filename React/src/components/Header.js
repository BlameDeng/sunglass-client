import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <header className="header">
      <div className="header-inner">
        <Link className="logo" to="/">
          Sunglass<sup>&reg;</sup>
        </Link>
      </div>
    </header>
  )
}

export default Header
