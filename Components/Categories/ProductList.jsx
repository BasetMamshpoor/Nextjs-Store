import React, { useRef } from 'react';
import Filters from './Filters';
import SortBy from './SortBy';
import Products from './Products';
import { useRouter } from 'next/router';

const ProductList = ({ id }) => {
    const router = useRouter()
    const total_Items = useRef()
    return (
        <>
            <section className='productList' dir="auto">
                <div className="container">
                    <div className={`d-flex`}>
                        <Filters category={id} />
                        <div className='Lops d-flex'>
                            <div className='d-flex align-center justify-between px-3'>
                                <SortBy router={router} sort={router.query.sort} />
                                <div className='total_product_items_esdw' ref={total_Items}></div>
                            </div>
                            <Products category={id} total_Items={total_Items} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductList;