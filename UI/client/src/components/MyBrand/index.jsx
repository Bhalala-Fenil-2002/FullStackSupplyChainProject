import React, { Suspense, lazy } from 'react';
import { Link } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";

const Shows = lazy(() => import("../Data"));

function MyCategory() {
  const props = {
    get: 'my-brand',
    delete: 'delete-brand',
    post: 'add-brand',
    TableCol: ['brand']
  }
  return (
    <>
      <div className='content-header'>
        <h1>My Brand</h1>
        <Link className='btn btn-secondary' to={'/add-brand'}><FaCirclePlus color='#fff' size={18} />&nbsp;&nbsp;Add Brand</Link>
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