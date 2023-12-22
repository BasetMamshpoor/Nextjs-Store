import { useRef } from 'react';
import style from './AdminProducts.module.css'
import Products from './Products';
import createModal from 'Components/Modal';
import Filters from 'Components/Categories/Filters';
import SortByMobile from 'Components/Categories/SortByMobile';
import { useRouter } from 'next/router';

const AdminProducts = () => {
    const router = useRouter()
    const total_Items = useRef()
    return (
        <>
            <div className={style.products}>
                <div className={style.navbar}>
                    <div className={style.options}>
                        <button type='button'
                            onClick={() => createModal(<Filters category={1} router={router} />)}
                            className={[style.filters_btn, style.btn].join(' ')}>فیلتر</button>
                        <button type='button'
                            onClick={() => createModal(<SortByMobile router={router} sort={router.query.sort} />)}
                            className={[style.sortBy_btn, style.btn].join(' ')}>مرتب سازی</button>
                    </div>
                    <div className={style.total_items} ref={total_Items}></div>
                </div>
                <div className={style.product_list}>
                    <Products total_Items={total_Items} />
                </div>
            </div>
        </>
    );
};

export default AdminProducts;