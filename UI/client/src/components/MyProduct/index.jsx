import React, { Suspense, lazy, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";
import useEth from '../../contexts/EthContext/useEth';

const Shows = lazy(() => import("../Data"));

function MyProduct() {
    const { state: { contract, accounts } } = useEth();
    useEffect(() => {
        read();
    }, [contract]);
    
    const read = async () => {
        if (contract) {
            try {
                const Items = await contract.methods.ItemsData().call({ from: accounts['0xa5fF5605A48caA0Daa6E05AC62F85E96397A9D14'] });
            } catch (error) {
                let errorMsg = error.message.replace("Internal JSON-RPC error.", "");
                let getError = JSON.parse(errorMsg).message.replace("VM Exception while processing transaction: revert ", "");
            }
        }
    }
    
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