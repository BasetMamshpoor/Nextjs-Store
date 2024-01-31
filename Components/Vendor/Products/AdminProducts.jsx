import { useEffect, useRef, useState } from 'react';
import style from './AdminProducts.module.css'
import Products from './Products';
import createModal from 'Components/Modal';
import Filters from 'Components/Categories/Filters';
import SortByMobile from 'Components/Categories/SortByMobile';
import { useRouter } from 'next/router';
import { BiChevronDown } from 'react-icons/bi';
import CategoryFilter from 'Components/Categories/CategoryFilter';
import { e2p } from 'Functions/ConvertNumbers';


const AdminProducts = () => {
    const router = useRouter()
    const total_Items = useRef()
    const popup = useRef()
    const [categoryId, setCategoryId] = useState(0)

    const handleClick = (event) => {
        event.stopPropagation()
        const popup = event.currentTarget.nextElementSibling
        popup.classList.toggle(style.activePopup)
    }

    useEffect(() => {
        window.addEventListener('click', handleHide)
        return () => window.removeEventListener('click', handleHide)
    }, [])

    const handleHide = (event) => {
        if (popup.current && !popup.current.contains(event.target))
            popup.current.classList.remove(style.activePopup)
    }

    useEffect(() => {
        if (total_Items.current && categoryId === 0)
            total_Items.current.innerText = `${e2p(0)} کالا`
    }, [categoryId])

    return (
        <>
            <div className={style.products}>
                <div className={style.navbar}>
                    <div className={style.options}>
                        <div className={style.category_btn}>
                            <div className={style.btn} onClick={handleClick}><span>دسته‌بندی</span><i><BiChevronDown /></i></div>
                            <div className={style.popup} ref={popup}>
                                <CategoryFilter categoryId={categoryId} setCategoryId={setCategoryId} />
                            </div>
                        </div>
                        {categoryId !== 0 ? <button type='button'
                            onClick={() => createModal(<Filters category={categoryId} router={router} />)}
                            className={[style.filters_btn, style.btn].join(' ')}>فیلتر</button> : null}
                        <button type='button'
                            onClick={() => createModal(<SortByMobile router={router} sort={router.query.sort} />)}
                            className={[style.sortBy_btn, style.btn].join(' ')}>مرتب سازی</button>
                    </div>
                    <div className={style.total_items} ref={total_Items}></div>
                </div>
                {categoryId === 0 ?
                    <p className={style.noCategory}>لطفا دسته بندی را انتخاب کنید.</p>
                    : <Products category={categoryId} total_Items={total_Items} />}
            </div>
        </>
    );
};

export default AdminProducts;