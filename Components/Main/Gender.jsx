import Link from 'next/link';
import React, { useState } from 'react';
import style from './Gender.module.css'

const Gender = () => {
    const [ToggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const getActiveClass = (index, className) =>
        ToggleState === index ? className : "";

    return (
        <div className={style.gender}>
            <div className="container" dir='rtl'>
                <ul className={style.tab_list}>
                    <li className={`${style.tabs} ${getActiveClass(1, style.active_tabs)}`} onClick={() => toggleTab(1)}>
                        مردانه
                    </li>
                    <li className={`${style.tabs} ${getActiveClass(2, style.active_tabs)}`} onClick={() => toggleTab(2)}>
                        زنانه
                    </li>
                    <li className={`${style.tabs} ${getActiveClass(3, style.active_tabs)}`} onClick={() => toggleTab(3)}>
                        بچگانه
                    </li>
                </ul>
                <div className={style.content_container}>
                    <div id={style.male} className={`${style.content} ${getActiveClass(1, style.active_content)}`}>
                        <div className={style.oLpy}>
                            <div className={style.ojRd}>
                                <Link href="/category-mens-clothing">
                                    <img src="images/b6d809bb0a50824bacfedf881e63a89250dd9547_1655095013.jpg"
                                        alt="" />
                                    <div className={style.nBcy}>
                                        <span>لباس مردانه</span>
                                    </div>
                                </Link>
                            </div>
                            <div className={style.ojRd}>
                                <Link href="/category-mens-shoes">
                                    <img src="images/ed72e19e2b3a3edc944adc408f8e0a298f97cb51_1655095035.jpg"
                                        alt="" />
                                    <div className={style.nBcy}>
                                        <span>کفش مردانه</span>
                                    </div>
                                </Link>
                            </div>
                            <div className={style.ojRd}>
                                <Link href="/category-mens-accessories">
                                    <img src="images/54b059fdf3ed0bfc177b0abf03f2af6cbe68124f_1655095048.jpg"
                                        alt="" />
                                    <div className={style.nBcy}>
                                        <span>اکسسوری مردانه</span>
                                    </div>
                                </Link>
                            </div>
                            <div className={style.ojRd}>
                                <Link href="/category-mens-sports">
                                    <img src="images/76d5a10bbfc176556a69767b899a4bff01d5fd88_1655095138.jpg"
                                        alt="" />
                                    <div className={style.nBcy}>
                                        <span>ورزشی مردانه</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div id={style.female} className={`${style.content} ${getActiveClass(2, style.active_content)}`}>
                        <div className={style.oLpy}>
                            <div className={style.ojRd}>
                                <Link href="/category-womens-shoes">
                                    <img src="images/bc865104c70dbf4f3f6222c33ed0712025f0154b_1655203102.jpg"
                                        alt="" />
                                    <div className={style.nBcy}>
                                        <span>کفش زنانه</span>
                                    </div>
                                </Link>
                            </div>
                            <div className={style.ojRd}>
                                <Link href="/category-womens-accessories">
                                    <img src="images/4e8bde04230ad0396ab76ee3ff50d2f0ed91db7e_1655203116.jpg"
                                        alt="" />
                                    <div className={style.nBcy}>
                                        <span>اکسسوری زنانه</span>
                                    </div>
                                </Link>
                            </div>

                            <div className={style.ojRd}>
                                <Link href="/category-womens-sports">
                                    <img src="images/aab9aebd48db4f5b48fe55da99aeb2c547c8a6ca_1655203146.jpg"
                                        alt="" />
                                    <div className={style.nBcy}>
                                        <span>ورزشی زنانه</span>
                                    </div>
                                </Link>
                            </div>
                            <div className={style.ojRd}>
                                <Link href="/category-womens-clothing">
                                    <img src="images/4254f19745e2df1770471407b585fb3502fc86af_1655203082.jpg"
                                        alt="" />
                                    <div className={style.nBcy}>
                                        <span>لباس زنانه</span>
                                    </div>
                                </Link>
                            </div>

                        </div>
                    </div>
                    <div id={style.kids} className={`${style.content} ${getActiveClass(3, style.active_content)}`}>
                        <div className={style.oLpy}>
                            <div className={style.ojRd}>
                                <Link href="/category-child-apparel">
                                    <img src="images/123f3fcf8fe1ad45977debe08521b6d6249d0ebe_1655095296.jpg"
                                        alt="" />
                                    <div className={style.nBcy}>
                                        <span>نوزاد</span>
                                    </div>
                                </Link>
                            </div>
                            <div className={style.ojRd}>
                                <Link href="/category-boy-apparel">
                                    <img src="images/69e5e89d323a51be95e578682aadb881cb4ba066_1655095321.jpg"
                                        alt="" />
                                    <div className={style.nBcy}>
                                        <span>پسرانه</span>
                                    </div>
                                </Link>
                            </div>
                            <div className={style.ojRd}>
                                <Link href="/category-girl-apparel">
                                    <img src="images/7b2946f2a6304ee7ffe2836a159600fc0546d096_1655095310.jpg"
                                        alt="" />
                                    <div className={style.nBcy}>
                                        <span>دخترانه</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Gender);
