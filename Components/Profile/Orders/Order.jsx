import style from './Order.module.css';
import { BsBuilding, BsArrowRight, BsDot } from "react-icons/bs";
import { TfiRuler } from 'react-icons/tfi';
import { FaRegComment } from "react-icons/fa";
import { e2p } from 'Functions/ConvertNumbers';
import Link from 'next/link';
import Image from 'next/image';
import addComma from 'Functions/addComma';
import useGetRequest from 'hooks/useGetPrivatRequest';
import Loading from 'Components/Loading';
import createModal from 'Components/Modal';
import AddComment from 'Components/Detaile/AddComment';
import { useContext } from 'react';
import { Functions } from 'providers/FunctionsProvider';

const Order = ({ data, setSingleOrder }) => {

    const [order] = useGetRequest(`/profile/orders/${data.id}`)
    const { SwalStyled } = useContext(Functions)

    return (
        <>
            {!!order ? <div className={style.order} dir='auto'>
                <div className={style.container}>
                    <div className={style.header}>
                        <button className={style.go_back} onClick={() => setSingleOrder()}><BsArrowRight /></button>
                        <div className={style.order_code}>
                            <p>جزئیات سفارش</p>
                        </div>
                    </div>
                    <div className={style.heading}>
                        <div className={style.info}>
                            <div className={[style.head_top, style.text].join(' ')}>
                                <div>
                                    کد پیگیری سفارش <span>{e2p(order.code)}</span>
                                </div>
                                <div className={style.icon}><BsDot /></div>
                                <div>
                                    تاریخ ثبت سفارش <span>{new Date(order.created_at).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                            </div>
                            <div className={style.head_address}>
                                <div className={[style.receiver, style.text].join(' ')}>
                                    <div>
                                        تحویل گیرنده <span>{order.address.name}</span>
                                    </div>
                                    <div className={style.icon}><BsDot /></div>
                                    <div>
                                        شماره موبایل <span>{e2p(order.address.cellphone)}</span>
                                    </div>
                                </div>
                                <div className={style.text}>
                                    <div>
                                        آدرس <span>{order.address.city} - {order.address.address}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.head_pay}>
                            <div className={style.text}>
                                <div>
                                    مبلغ <span className={style.toman}>{addComma(order.total_price)}</span>
                                </div>
                                {!!order.offPrice && <>
                                    <div className={style.icon}><BsDot /></div>
                                    <div>
                                        سود شما از خرید <span className={style.toman}>{addComma(order.offPrice ?? 0)}</span>
                                    </div>
                                </>}
                                <div className={style.icon}><BsDot /></div>
                                <div>
                                    <span>پرداخت اینترنتی</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.main}>
                        <div className={style.content}>
                            <div className={style.products}>
                                {!!order && order.orderItems.map(p => {
                                    return (
                                        <div className={style.tEl_7HqZy} key={p.product.id}>
                                            <div className={style.LbOT_Plwz33}>
                                                <Link href={`/products/${p.product.id}`} state={p.product.sizes} className={style.C41A__jF}>
                                                    <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={100} height={100} unoptimized={true} src={p.product.image} alt="" />
                                                    <span className={style.quantity}>{e2p(p.quantity)}</span>
                                                </Link>
                                                <div className={style.lGJkVwYt}>
                                                    <h3 className={style.RxQOi_5_ed}>{p.product.name}</h3>
                                                    <div className={style.MncBgTfd_Pr}>
                                                        <div className={style.box}>
                                                            <div className={style.Detail_Pnmvg}>
                                                                <BsBuilding />
                                                            </div>
                                                            <p>{p.product.brand}</p>
                                                        </div>
                                                        <div className={style.box}>
                                                            <div className={style.Detail_Pnmvg}><span style={{ background: p.product.colorCode }}></span></div>
                                                            <p>{p.product.color}</p>
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
                                                <div className={style.reviwe} onClick={() => createModal(<AddComment SwalStyled={SwalStyled} id={p.product.id} />)}>
                                                    ثبت دیدگاه
                                                    <div className={style.icon}><FaRegComment /></div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div> : <Loading />}
        </>
    );
};

export default Order;