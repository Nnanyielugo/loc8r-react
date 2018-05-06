import React from  'react';
import { Link } from 'react-router-dom'

const navbar = props => {
  return (
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link to='/' className="navbar-brand">Loc8r</Link>
        </div>
        <div id="navbar" className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li><a href="#about">About</a></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            {/* <li className="active"><a href="#">Home</a></li>
            <li><a href="#about">About</a></li> */}
            <li><a href="#contact">Login</a></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default navbar;