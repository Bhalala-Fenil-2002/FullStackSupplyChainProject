import React, { Suspense, lazy } from 'react';
import { Link } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";

const Shows = lazy(() => import("../Data"));

function MyProduct() {
    const props = {
        post: 'add-product',
        get: 'my-product',
        view: 'view-product',
        delete: 'delete-product',
        TableCol: ['image', 'product', 'brand', 'category', 'price', 'qty', 'skus']
    }
    return (
        <>
            <div className='content-header'>
                <h1>My Product</h1>
                <Link className='btn btn-secondary' to={'/add-product'}><FaCirclePlus color='#fff' size={18} />&nbsp;&nbsp;Add Product</Link>
            </div>
            <section className='content my-product'>
                <Suspense fallback={<img src='/loader/DataLoader.gif' alt='Loding...' />}>
                    <Shows dataGetter={props} />
                </Suspense>
            </section>
        </>
    );
}

export default MyProduct;