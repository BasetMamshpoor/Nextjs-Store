import Link from 'next/link';
import React from 'react';
import style from './Breadcrumb.module.css'

const Breadcrumb = ({ breadcrumb = [] }) => {
    return (
        <>
            <div className={style.breadcrumb}>
                <ul className={style.list}>
                    <li className={style.route}>
                        <Link href={'/'} className={style.link}>
                            خانه <span>/</span>
                        </Link>
                    </li>
                    {breadcrumb.map((b, i) => {
                        return (
                            <li key={b.id} className={style.route}>
                                <Link href={`/category-${b.parent_id === null ? `${b.slug}-apparel` : b.slug}`} className={style.link}>
                                    {b.name}
                                    <span>
                                        {(breadcrumb.length - 1) === i ? '' : '/'}
                                    </span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </>
    );
};

export default Breadcrumb;