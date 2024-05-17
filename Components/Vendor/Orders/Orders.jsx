import { BsArrowLeft } from 'react-icons/bs'
import style from './Orders.module.css'
import Pagination from 'Components/Pagination/Pagination';
import useGetPrivatRequest from 'hooks/useGetPrivatRequest';
import addComma from 'Functions/addComma';
import { e2p } from 'Functions/ConvertNumbers';
import { useState } from 'react';
import Loading from 'Components/Loading';
import img from 'public/Images/order.png'
import Order from './Order';
import { useRouter } from 'next/router';

const Orders = () => {
    const router = useRouter();
    const { order: orderID } = router.query
    const [currentPage, setCurrentPage] = useState(1)
    const [singleOrder, setSingleOrder] = useState(orderID ? { id: orderID } : undefined)

    const [orders, setOrders, reload, pagination] = useGetPrivatRequest('/admin/orders', currentPage, { items_perpage: 10 })

    const statusFun = (status) => {
        const json = [
            { class: style.cancelled_order, value: 'لغو شده' },
            { class: style.pending_order, value: 'آماده سازی' },
            { class: style.delivered_order, value: 'تحویل داده شد' }
        ]
        return (
            <div className={`${style.aR9_nu_st} ${json[status].class}`}>
                <span>{json[status].value}</span>
            </div>
        )
    }
    const payStatus = (status) => {
        const json = [
            { class: style.deliveredPayment, value: 'پرداخت شد' },
            { class: style.cancelledPayment, value: 'لغو شده' },
            // { class: style.awaitingPayment, value: 'در انتظار پرداخت' },
        ]
        return (
            <div className={`${style.aR9_nu} ${json[status].class}`}>
                <span>{json[status].value}</span>
            </div>
        )
    }

    const detailOrder = (order) => {
        setSingleOrder(order)
        router.replace({
            query: { ...router.query, order: order.id },
        });
    }
    
    return (
        <>
            {!!singleOrder ? <Order data={singleOrder.id} setSingleOrder={setSingleOrder} /> :
                (!!orders ?
                    <div className={style.dSezpb6} dir="rtl">
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
                                                <div className={style.WMeJalq} onClick={() => detailOrder(o)}>
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
                                                </div>
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
                    : <Loading />)
            }
        </>
    );
};

export default Orders;