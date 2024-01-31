import React from 'react';
import style from './SortByMobile.module.css'
import { FaAngleLeft } from "react-icons/fa6";
const SortByMobile = ({ router, sort = 'newest', setIsOpen }) => {
    const { slug, vendor, ...Query } = router.query
    const handleClick = (e, tg) => {
        e.preventDefault();
        router.push({
            pathname: router.asPath.split('?')[0],
            query: { ...Query, sort: tg },
        });
        setTimeout(() => {
            setIsOpen(false)
        }, 500)
    }
    return (
        <>
            <div className={style.Cueq}>
                <div className={style.parent}>
                    <label>مرتب سازی :</label>
                    <ul className={style.sortList}>
                        <li className={sort == 'newest' ? style.activeSort : ''}>
                            <a onClick={(e) => handleClick(e, 'newest')}>جدیدترین</a>
                            <FaAngleLeft />
                        </li>
                        <li className={sort == 'bestselling' ? style.activeSort : ''}>
                            <a onClick={(e) => handleClick(e, 'bestselling')}>پرفروش‌ترین‌</a>
                            <FaAngleLeft />
                        </li>
                        <li className={sort == 'favorite' ? style.activeSort : ''}>
                            <a onClick={(e) => handleClick(e, 'favorite')}>محبوب‌ترین</a>
                            <FaAngleLeft />
                        </li>
                        <li className={sort == 'max' ? style.activeSort : ''}>
                            <a onClick={(e) => handleClick(e, 'max')}>گرانترین</a>
                            <FaAngleLeft />
                        </li>
                        <li className={sort == 'min' ? style.activeSort : ''}>
                            <a onClick={(e) => handleClick(e, 'min')}>ارزانترین</a>
                            <FaAngleLeft />
                        </li>
                    </ul>
                </div>

            </div>
        </>
    );
};

export default React.memo(SortByMobile);