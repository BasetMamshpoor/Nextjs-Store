import React, { useState } from 'react';
import style from './Component.module.css'
import Link from 'next/link';

const Component = ({ page, query, links, children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const handleOpen = () => {
        setIsOpen(!isOpen)
    }
    return (
        <>
            {!!links &&
                <div className="row">
                    <div className='col-lg-3'>
                        <div className={style.sidebar}>
                            <input type="checkbox" checked={isOpen} hidden id={style.burger_box} />
                            <div className={style.burger_menu}>
                                <label htmlFor={style.burger_box} className={style.burger} onClick={handleOpen}>
                                    <span></span><span></span><span></span>
                                </label>
                            </div>
                            <div className={style.sidebar_menu}>
                                <div className={style.sidebar_links}>
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
                            </div>
                            <div className={style.sidebar_com}>
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
                        </div>
                    </div>
                    <div className='col-lg-9'>
                        {links.find(routes => routes.link === query)?.component}
                    </div>
                </div>
            }
        </>
    );
};

export default Component;