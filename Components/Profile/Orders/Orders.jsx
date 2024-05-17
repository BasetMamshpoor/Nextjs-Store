import { MdShoppingBag, MdChevronLeft } from 'react-icons/md'
import { BsDot } from 'react-icons/bs'
import { FaCheckCircle } from "react-icons/fa";
import style from './Orders.module.css'
import Pagination from 'Components/Pagination/Pagination';
import useGetPrivatRequest from 'hooks/useGetPrivatRequest';
import addComma from 'Functions/addComma';
import { e2p } from 'Functions/ConvertNumbers';
import { useState } from 'react';
import Loading from 'Components/Loading';
import img from 'public/Images/order.png'
import Order from './Order';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Orders = () => {
    const router = useRouter();
    const { order: orderID } = router.query
    const [currentPage, setCurrentPage] = useState(1)
    const [singleOrder, setSingleOrder] = useState(orderID ? { id: orderID } : undefined)

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
                        <div className={style.MfdNsa}>
                            <MdShoppingBag />
                            <p className={style.QzEmd}>تاریخچه سفارشات</p>
                        </div>
                        {!!orders.length > 0 ?
                            <>
                                <div className={style.DybIay}>
                                    <div className={style.RxaPlo}>
                                        {orders.map(o => {
                                            return (
                                                <article className={style.order} key={o.id} onClick={() => detailOrder(o)}>
                                                    <div className={style.or_header}>
                                                        <div className={style.or_top}>
                                                            <div className={style.status}><div className={style.icon}><FaCheckCircle /></div><span>{statusFun(o.status)}</span></div>
                                                            <div className={style.icon}><MdChevronLeft /></div>
                                                        </div>
                                                        <div className={style.content}>
                                                            <div className={style.or_date}>{new Date(o.created_at).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                                            <div className={style.or_info}>
                                                                <div className={style.icon}><BsDot /></div>
                                                                کد سفارش <span>{e2p(o.code)}</span>
                                                            </div>
                                                            <div className={style.or_info}>
                                                                <div className={style.icon}><BsDot /></div>
                                                                مبلغ <span className={style.toman}>{addComma(o.total_price)}</span>
                                                            </div>
                                                            {!!o.offPrice && <div className={style.or_info}>
                                                                <div className={style.icon}><BsDot /></div>
                                                                تخفیف <span className={style.toman}>{addComma(o.offPrice)}</span>
                                                            </div>}
                                                        </div>
                                                    </div>
                                                    <div className={style.pictures}>
                                                        <div className={style.images}>
                                                            {o.orderItems.map(img => {
                                                                return (
                                                                    <div className={style.layout} key={img.id}>
                                                                        <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={100} height={100} unoptimized={true} src={img.product_image} alt="" />
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                </article>
                                            )
                                        })}
                                    </div>
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