import React from 'react';
import style from './Component.module.css'
import Link from 'next/link';

const Component = ({ page, query, links, children }) => {

    return (
        <>
            {!!links &&
                <div className="row">
                    <div className={`col-3 ${style.sidebar}`}>
                        {children}
                        <div className={style.loVgtSw_5Q}>
                            <ul className={style.OcWz_yc1a}>
                                {links.map(route => {
                                    return (<li className={style.list} key={route.name}>
                                        <Link href={`/${page}/${route.link}`}
                                            className={`${style.JbxnrS_6g6d} ${!!(query === route.link) ? style.JbxnrS_active : ''}`}>
                                            <div className={style.cxZw_p112}>
                                                <div>
                                                    {route.icon}
                                                </div>
                                                <p>{route.name}</p>
                                            </div>
                                        </Link>
                                    </li>)
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className={`col-9 ${style.col_9}`}>
                        {links.find(routes => routes.link === query)?.component}
                    </div>
                </div>
            }
        </>
    );
};

export default Component;