import { e2p } from 'Functions/ConvertNumbers';
import style from './Order.module.css';
import { FiCalendar, FiArrowUpLeft, FiUser, FiPhone } from "react-icons/fi";
import { BsThreeDotsVertical, BsBuilding, BsArrowRight, BsTruck } from "react-icons/bs";
import Link from 'next/link';
import UserProf from '/public/Images/Ei-user.svg'
import Image from 'next/image';
import { TfiRuler } from 'react-icons/tfi';
import addComma from 'Functions/addComma';
import useGetRequest from 'hooks/useGetPrivatRequest';
import Loading from 'Components/Loading';

const Order = ({ data, setSingleOrder }) => {
    const [order] = useGetRequest(`/admin/orders/${data.id}`)

    const imageUrl = `https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/${order?.address.latitude},${order?.address.longitude}/12?mapSize=120,120&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}`

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
    return (
        <>
            {!!order ? <div className={style.order} dir='auto'>
                <div className={style.container}>
                    <div className={style.header}>
                        <button className={style.go_back} onClick={() => setSingleOrder()}><BsArrowRight /></button>
                        <div className={style.order_code}>
                            <p>سفارش</p> <span>{e2p(order.code)}</span>
                        </div>
                    </div>
                    <div className={style.navbar}>
                        <div className={style.info}>
                            <div className={style.status_section}>
                                {payStatus(order.payment_status)}
                                {statusFun(order.status)}
                            </div>
                            <span> | </span>
                            <div className={style.date}>
                                <div className={style.date_icon}>
                                    <FiCalendar />
                                </div>
                                <p>{new Date(order.created_at).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                <p>{new Date(order.created_at).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                        </div>
                        <div className={style.actions}>
                            <button className={style.fulfill}><BsTruck />آماده ارسال</button>
                            <div className={style.more_actions}>
                                <button className={style.action_icon}><BsThreeDotsVertical /></button>
                                <div className={style.popup}>
                                    <ul className={style.popuop_list}>
                                        <li>لغو کل سفارش</li>
                                        <li>لغو قسمتی از سفارش</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.main}>
                        <div className={style.customer}>
                            <div className={style.title}>مشتری</div>
                            <div className={style.user}>
                                <Link href={`/admin/users`} target='_blank'>
                                    <div className={style.user_profile}>
                                        <div className={style.user_image}>
                                            <img src={UserProf.src} alt="" />
                                        </div>
                                        <p className={style.user_name}>سید نجم الدین فخرالدین پور</p>
                                    </div>
                                    <button className={style.user_arrow}><FiArrowUpLeft /></button>
                                </Link>
                            </div>
                            <div className={style.contact}>
                                <p className={style.sm_title}>مشخصات گیرنده</p>
                                <div className={style.receiver}>
                                    <ul className={style.receiver_contact}>
                                        <li>
                                            <div><FiUser /></div>{order.address.name}
                                        </li>
                                        <li className={style.receiver_cellphone}>
                                            <div><FiPhone /></div> <a href="tel:09990990909">{order.address.cellphone}</a>
                                        </li>
                                    </ul>
                                    <div className={style.address_sec}>
                                        <p className={style.sm_title}>آدرس تحویل</p>
                                        <ul className={style.address}>
                                            <li className={style.address_main}>{order.address.province} - {order.address.city} - {order.address.address}</li>
                                            <li className={style.number_house}>
                                                <span>پلاک: </span>{e2p(order.address.number)}
                                                <b>|</b>
                                                <span>واحد: </span>{e2p(order.address.unit ?? 0)}
                                            </li>
                                            <li className={style.postalcode}><span>کدپستی: </span>{e2p(order.address.postalcode)}</li>
                                        </ul>
                                        <div className={style.simple_map_img}>
                                            <Image src={!!imageUrl ? imageUrl : '/Images/placeholder-1.png'}
                                                placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={100}
                                                height={100} unoptimized={true} alt='' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.content}>
                            <div>
                                <div className={style.title}>محصولات</div>
                                <div className={style.products}>
                                    {!!order && order.orderItems.map(p => {
                                        return (
                                            <div className={style.tEl_7HqZy} key={p.product.id}>
                                                <div className={style.LbOT_Plwz33}>
                                                    <Link href={`/products/${p.product.id}`} state={p.product.sizes} className={style.C41A__jF}>
                                                        <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={100} height={100} unoptimized={true} src={p.product.image} alt="" />
                                                    </Link>
                                                    <div className={style.lGJkVwYt}>
                                                        <h3 className={style.RxQOi_5_ed}>{p.product.name}</h3>
                                                        <div className={style.MncBgTfd_Pr}>
                                                            <div className={style.box}>
                                                                <div className={style.Detail_Pnmvg}>
                                                                    <BsBuilding />
                                                                </div>
                                                                <p>{p.product.brand || 'نایکی'}</p>
                                                            </div>
                                                            <div className={style.box}>
                                                                <div className={style.Detail_Pnmvg}><span style={{ background: '#3499ff' }}></span></div>
                                                                <p>{p.product.color || 'آبی'}</p>
                                                            </div>
                                                            <div className={style.box}>
                                                                <div className={style.Detail_Pnmvg}>
                                                                    <TfiRuler />
                                                                </div>
                                                                <p>{p.size}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={style.vVBE__0Oiju}>
                                                        <div className={style.G_VwXabc_99L}>
                                                            <p className={style.price_3Sproduct}>{addComma(p.product.offPrice.toString())}</p>
                                                            {p.product.offPrice !== p.product.price && <del className={style.UcUrzyq}>{addComma(p.product.price.toString())}</del>}
                                                        </div>
                                                    </div>
                                                    <div className={style.pricing}>
                                                        <div className={style.quantity}><span>تعداد</span>{e2p(p.quantity)}</div>
                                                        <div className={style.subtotal}><span>جمع قیمت</span>{addComma(p.subtotal)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className={style.payment_summary}>
                                <div className={style.sm_title}>خلاصه پرداخت</div>
                                <div className={style.pricing_detail}>
                                    <ul>
                                        <li className={style.pricing_item}><b>تعداد کل محصولات: </b><span className={style.all_quantity}>{e2p(15)}</span></li>
                                        <li className={style.pricing_item}><b>قیمت کل: </b><span className={style.value}>{addComma(0)}</span></li>
                                        <li className={style.pricing_item}><b>مقدار تخفیف: </b><span className={style.value}>{addComma(0)}</span></li>
                                        <li className={style.pricing_item}><b>پرداخت شده: </b><span className={style.value}>{addComma(order.total_price)}</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : <Loading />}
        </>
    );
};

export default Order;