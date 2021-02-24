import React from 'react';
import { Link } from 'react-router-dom';
import Routes from '..';

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid justify-content-end">
        <Link className="btn btn-outline-success me-2" to={Routes.createUser}>
          Create user
        </Link>
      </div>
    </nav>
  );
}
