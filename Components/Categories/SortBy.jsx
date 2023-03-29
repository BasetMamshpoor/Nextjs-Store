import Link from 'next/link';
import React from 'react';
import style from './SortBy.module.css'
const SortBy = () => {
    return (
        <>
            <div className={style.Cueq}>
                <label>مرتب سازی :</label>
                <ul className={style.sortList}>
                    <li className={style.activeSort}><Link href="/">پربازدیدترین</Link></li>
                    <li><Link href="/">پرفروش‌ترین‌</Link></li>
                    <li><Link href="/">محبوب‌ترین</Link></li>
                    <li><Link href="/">جدیدترین</Link></li>
                    <li><Link href="/">گرانترین</Link></li>
                    <li><Link href="/">ارزانترین</Link></li>
                </ul>
            </div>
        </>
    );
};

export default React.memo(SortBy);