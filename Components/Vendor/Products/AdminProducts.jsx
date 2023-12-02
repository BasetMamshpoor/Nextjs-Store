import { useRef } from 'react';
import style from './AdminProducts.module.css'
import Products from './Products';
import createModal from 'Components/Modal';

const AdminProducts = () => {
    const total_Items = useRef()

    const handleClick = () => createModal()
    return (
        <>
            <div className={style.products}>
                <div className={style.navbar}>
                    <div className={style.options}>
                        <button type='button' onClick={handleClick} className={[style.filters_btn, style.btn].join(' ')}>فیلتر</button>
                        <button type='button' onClick={handleClick} className={[style.sortBy_btn, style.btn].join(' ')}>مرتب سازی</button>
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