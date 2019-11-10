import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>
      <Link to="/books">Book Shelf</Link>
      <Link to="/book">Create a new book</Link>
    </h1>
  </header>
);

export default Header;
