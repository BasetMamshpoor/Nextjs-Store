import Link from 'next/link';
import React from 'react';
import style from './SortBy.module.css'

const SortBy = ({ router, sort = 'newest' }) => {
    const { slug, ...Query } = router.query


    return (
        <>
            <div className={style.Cueq}>
                <label>مرتب سازی :</label>
                <ul className={style.sortList}>
                    <li className={sort == 'newest' ? style.activeSort : ''}>
                        <Link href={{
                            pathname: router.asPath.split('?')[0],
                            query: { ...Query, sort: 'newest' },
                        }}
                            passHref
                            shallow
                            replace>جدیدترین</Link>
                    </li>
                    <li className={sort == 'bestselling' ? style.activeSort : ''}>
                        <Link href={{
                            pathname: router.asPath.split('?')[0],
                            query: { ...Query, sort: 'bestselling' },
                        }}
                            passHref
                            shallow
                            replace>پرفروش‌ترین‌</Link>
                    </li>
                    <li className={sort == 'favorite' ? style.activeSort : ''}>
                        <Link href={{
                            pathname: router.asPath.split('?')[0],
                            query: { ...Query, sort: 'favorite' },
                        }}
                            passHref
                            shallow
                            replace>محبوب‌ترین</Link>
                    </li>
                    <li className={sort == 'max' ? style.activeSort : ''}>
                        <Link href={{
                            pathname: router.asPath.split('?')[0],
                            query: { ...Query, sort: 'max' },
                        }}
                            passHref
                            shallow
                            replace>گرانترین</Link>
                    </li>
                    <li className={sort == 'min' ? style.activeSort : ''}>
                        <Link href={{
                            pathname: router.asPath.split('?')[0],
                            query: { ...Query, sort: 'min' },
                        }}
                            passHref
                            shallow
                            replace>ارزانترین</Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default React.memo(SortBy);