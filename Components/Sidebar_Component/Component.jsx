import React, { useContext, useState } from 'react';
import style from './Component.module.css'
import Link from 'next/link';
import { GrClose } from 'react-icons/gr';
import { Authorization } from 'providers/AuthorizationProvider';
import { IoIosLogOut } from 'react-icons/io';

const Component = ({ page, query, links, children }) => {
    const [isOpen, setIsOpen] = useState(false)
    const { logOut } = useContext(Authorization)

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            {!!links &&
                <div className="row">
                    <div className='col-lg-3'>
                        <div className={style.sidebar}>
                            <div className={style.burger_menu}>
                                <label className={style.burger} onClick={handleOpen}>
                                    <span></span><span></span><span></span>
                                </label>
                            </div>
                            <div className={`${style.sidebar_menu} ${isOpen ? style.slide_open : ''}`} onClick={handleOpen}>
                                <div className={style.sidebar_links} onClick={e => e.stopPropagation()}>
                                    <div className={style.close_side} onClick={handleOpen}>
                                        <GrClose />
                                    </div>
                                    {children}
                                    <div className={style.loVgtSw_5Q}>
                                        <ul className={style.OcWz_yc1a}>
                                            {links.map(route => {
                                                return (<li className={style.list} key={route.name}>
                                                    <Link href={`/${page}/${route.link ?? ''}`} onClick={handleOpen}
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
                                            <li className={style.list} onClick={logOut}>
                                                <a className={style.JbxnrS_6g6d}>
                                                    <div className={style.cxZw_p112}>
                                                        <div>
                                                            <IoIosLogOut />
                                                        </div>
                                                        <p>خروج</p>
                                                    </div>
                                                </a>
                                            </li>
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
                                                <Link href={`/${page}/${route.link ?? ''}`}
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
                                        <li className={style.list} onClick={logOut}>
                                            <a className={style.JbxnrS_6g6d}>
                                                <div className={style.cxZw_p112}>
                                                    <div>
                                                        <IoIosLogOut />
                                                    </div>
                                                    <p>خروج</p>
                                                </div>
                                            </a>
                                        </li>
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