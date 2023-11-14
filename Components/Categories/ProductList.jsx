import React, { useRef } from 'react';
import Filters from './Filters';
import SortBy from './SortBy';
import Products from './Products';
import { useRouter } from 'next/router';
import style from './ProductList.module.css'

const ProductList = ({ id }) => {
    const router = useRouter()
    const total_Items = useRef()
    return (
        <>
            <section className={style.productList} dir="rtl">
                <div className="container">
                    <div className={`d-flex`}>
                        <Filters category={id} />
                        <div className={style.Lops}>
                            <div className={style.oLkvy}>
                                <SortBy router={router} sort={router.query.sort} />
                                <div className={style.totalItems} ref={total_Items}></div>
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