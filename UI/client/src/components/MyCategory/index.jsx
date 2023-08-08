import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Table } from 'react-bootstrap';
import { FaCirclePlus } from "react-icons/fa6";

const Shows = lazy(() => import("../Data"));

function MyCategory() {
  // const TableCol = ['Category', 'Brand'];
  const props = {
    get: 'my-category',
    delete: 'delete-category',
    post: 'add-category',
    TableCol: ['category', 'brand']
  }
  return (
    <>
      <div className='content-header'>
        <h1>My Category</h1>
        <Link className='btn btn-secondary' to={'/add-category'}><FaCirclePlus color='#fff' size={18} />&nbsp;&nbsp;Add Category</Link>
      </div>
      <section className='content my-category'>
        <Suspense fallback={<img src='/loader/DataLoader.gif' />}>
          <Shows dataGetter={props} />
        </Suspense>
      </section>
    </>
  )
}

export default MyCategory