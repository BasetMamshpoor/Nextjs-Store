import { MdShoppingBag } from 'react-icons/md'
import { BsArrowLeft } from 'react-icons/bs'
import style from './Orders.module.css'
import Pagination from 'Components/Pagination/Pagination';
import useGetPrivatRequest from 'hooks/useGetPrivatRequest';
import Link from 'next/link';
import addComma from 'Functions/addComma';
import { e2p } from 'Functions/ConvertNumbers';
import { useState } from 'react';
import Loading from 'Components/Loading';
import img from 'public/Images/order.png'

const Orders = () => {
    const [currentPage, setCurrentPage] = useState(1)

    const [orders, setOrders, reload, pagination] = useGetPrivatRequest('/profile/orders', currentPage)

    const statusFun = (status) => {
        const json = [
            { class: style.cancelled_order, value: 'لغو شده' },
            { class: style.pending_order, value: 'آماده سازی' },
            { class: style.delivered_order, value: 'تحویل داده شد' }
        ]
        return (
            <div className={`${style.aR9_nu} ${json[status].class}`}>
                <span>{json[status].value}</span>
            </div>
        )
    }
    const payStatus = (status) => {
        const json = [
            { class: style.cancelled_order, value: 'لغو شده' },
            { class: style.delivered_order, value: 'پرداخت شد' },
            // { class: style.awaitingPayment, value: 'در انتظار پرداخت' },
        ]
        return (
            <div className={`${style.aR9_nu} ${json[status].class}`}>
                <span>{json[status].value}</span>
            </div>
        )
    }

    return (
        <>
            {!!orders ?
                <div className={style.dSezpb6} dir="rtl">
                    <div className={style.MfdNsa}>
                        <MdShoppingBag />
                        <p className={style.QzEmd}>تاریخچه سفارشات</p>
                    </div>
                    {!!orders.length > 0 ? <>
                        <div className={style.KnLxqov}>
                            <ul className={style.SzPld}>
                                <li>کد سفارش</li>
                                <li>وضعیت</li>
                                <li>تاریخ</li>
                                <li>مبلغ نهایی</li>
                                <li>وضعیت پرداخت</li>
                                <li></li>
                            </ul>
                        </div>
                        <div className={style.DybIay}>
                            <ul className={style.RxaPlo}>
                                {orders.map(o => {
                                    return (
                                        <li key={o.id}>
                                            <Link href="/" className={style.WMeJalq}>
                                                <p>{e2p(o.code)}</p>
                                                <div>
                                                    {statusFun(o.status)}
                                                </div>
                                                <p>{new Date(o.created_at).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                                <p className={style.order_PL}>{addComma(o.total_price)}</p>
                                                <div>
                                                    {payStatus(o.payment_status)}
                                                </div>
                                                <div className={style.mknBg}>
                                                    <BsArrowLeft />
                                                </div>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </>
                        : <div className={style.empty}>
                            <div className={style.pHvtxu}>
                                <div className={style.pic}>
                                    <img src={img.src} alt="" />
                                </div>
                                <p>هنوز هیچ سفارشی ندادید</p>
                            </div>
                        </div>}
                    <Pagination currentPage={currentPage} setCurrentPage={(e) => setCurrentPage(e)} dataLength={pagination.meta.total} itemsPerPage={pagination.meta.per_page} boxShadow={false} />
                </div >
                : <Loading />}
        </>
    );
};

export default Orders;