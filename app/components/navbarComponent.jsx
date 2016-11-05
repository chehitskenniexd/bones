import React from 'react';
import { Link } from 'react-router';

export default () => (

<nav className="navbar navbar-inverse navbar-fixed-top">
  <Link to="cart" id="cart" className="btn" data-placement="bottom" title="Ready to Buy?" >
    <span className="glyphicon glyphicon-shopping-cart"></span>
  </Link>
  <div className="container">
    <div className="navbar-header">
      <a className="navbar-brand" href="#">CodeCommerce</a>
      <form className="navbar-form navbar-left" role="search">
        <div className="form-group">
          <input type="text" className="form-control" placeholder="BST, loops, etc..."></input>
        </div>
        <button type="submit" className="btn btn-default">Search</button>
      </form>
    </div>
  </div>
</nav>
);
