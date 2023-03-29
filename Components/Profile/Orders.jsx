import React from 'react';
import { MdShoppingBag } from 'react-icons/md'
import { BsArrowLeft } from 'react-icons/bs'
import style from './Orders.module.css'
import Pagination from 'Components/Pagination/Pagination';

const Orders = () => {
    return (
        <>
            <div className={style.dSezpb6} dir="rtl">
                <div className={style.MfdNsa}>
                    <MdShoppingBag />
                    <p className={style.QzEmd}>تاریخچه سفارشات</p>
                </div>
                <div className={style.KnLxqov}>
                    <ul className={style.SzPld}>
                        <li>سفارش</li>
                        <li>وضعیت</li>
                        <li>تاریخ</li>
                        <li>مبلغ</li>
                        <li></li>
                    </ul>
                </div>
                <div className={style.DybIay}>
                    <ul className={style.RxaPlo}>
                        <li>
                            <a href="." className={style.WMeJalq}>
                                <p>۲۹۵۲۹۷۶۸۶</p>
                                <div>
                                    <div className={`${style.aR9_nu} ${style.pending_order}`}>
                                        <span>آماده سازی</span>
                                    </div>
                                </div>
                                <p>۱۴ آبان ۱۴۰۱</p>
                                <p className={style.order_PL}>۴۰۰,۰۰۰</p>
                                <div className={style.mknBg}>
                                    <BsArrowLeft />
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="." className={style.WMeJalq}>
                                <p>۲۹۵۲۹۷۶۸۶</p>
                                <div>
                                    <div className={`style.aR9_nu style.delivered_order`}>
                                        <span>تحویل داده شده</span>
                                    </div>
                                </div>
                                <p>۱۸ شهریور ۱۴۰۱</p>
                                <p className={style.order_PL}>۱,۵۰۰,۰۰۰</p>
                                <div className={style.mknBg}>
                                    <BsArrowLeft />
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="." className={style.WMeJalq}>
                                <p>۲۹۵۲۹۷۶۸۶</p>
                                <div>
                                    <div className={`style.aR9_nu delivered_order`}>
                                        <span>تحویل داده شده</span>
                                    </div>
                                </div>
                                <p>۱۳ تیر ۱۴۰۱</p>
                                <p className={style.order_PL}>۶۷,۰۰۰</p>
                                <div className={style.mknBg}>
                                    <BsArrowLeft />
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="." className={style.WMeJalq}>
                                <p>۲۹۵۲۹۷۶۸۶</p>
                                <div>
                                    <div className={`${style.aR9_nu} ${style.delivered_order}`}>
                                        <span>تحویل داده شده</span>
                                    </div>
                                </div>
                                <p>۰۵ خرداد ۱۴۰۱</p>
                                <p className={style.order_PL}>۵۳۱,۸۰۳</p>
                                <div className={style.mknBg}>
                                    <BsArrowLeft />
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="." className={style.WMeJalq}>
                                <p>۲۹۵۲۹۷۶۸۶</p>
                                <div>
                                    <div className={`${style.aR9_nu} ${style.cancelled_order}`}>
                                        <span>لغو شده</span>
                                    </div>
                                </div>
                                <p>۲۵ فروردین ۱۴۰۱</p>
                                <p className={style.order_PL}>۱۹۹,۰۰۰</p>
                                <div className={style.mknBg}>
                                    <BsArrowLeft />
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
                <Pagination
                    setCurrentPage={(c) => console.log(c)}
                />
            </div>
        </>
    );
};

export default Orders;