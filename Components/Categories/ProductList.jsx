import React, { useRef } from 'react';
import Filters from './Filters';
import SortBy from './SortBy';
import Products from './Products';
import { useRouter } from 'next/router';
import style from './ProductList.module.css'
import createModal from 'Components/Modal';
import useMediaQuery from 'hooks/useMediaQuery';
import SortByMobile from './SortByMobile';

const ProductList = ({ id }) => {
    const router = useRouter()
    const total_Items = useRef()
    const isMatch = useMediaQuery('(max-width: 1023.98px)')

    return (
        <>
            <section className={style.productList} dir="rtl">
                <div className="container">
                    <div className='row'>
                        <div className='col-lg-3'>
                            {!isMatch && <Filters category={id} router={router} />}
                        </div>
                        <div className={`${style.Lops} col-lg-9`}>
                            <div className={style.oLkvy}>
                                {!isMatch && <SortBy router={router} sort={router.query.sort} />}
                                {!!router && <div className={style.options}>
                                    <button type='button'
                                        onClick={() => createModal(<Filters category={id} router={router} />)}
                                        className={[style.filters_btn, style.btn].join(' ')}>فیلتر</button>
                                    <button type='button'
                                        onClick={() => createModal(<SortByMobile router={router} sort={router.query.sort} />)}
                                        className={[style.sortBy_btn, style.btn].join(' ')}>مرتب سازی</button>
                                </div>}
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