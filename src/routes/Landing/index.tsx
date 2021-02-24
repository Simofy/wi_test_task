import React from 'react';
import Header from './Header';
import Table from './Table';

export default function Landing() {
  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-10 offset-xl-1">
            <Table />
          </div>
        </div>
      </div>
    </>
  );
}
