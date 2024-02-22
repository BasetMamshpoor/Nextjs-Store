import useGetPrivatRequest from 'hooks/useGetPrivatRequest';
import style from './Comments.module.css'
import { e2p } from 'Functions/ConvertNumbers';
import Link from 'next/link';
import Pagination from 'Components/Pagination/Pagination';
import { useState } from 'react';
import Loading from 'Components/Loading';
import { BsThreeDotsVertical, BsTrash, BsPen } from "react-icons/bs";
import img from 'public/Images/order.png'

const Comments = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [comments, setComments, reload, pagination] = useGetPrivatRequest('/profile/comments', currentPage)


    return (
        <>
            <div className={style.QaybTx}>
                <div className={style.head}>
                    <h4>دیدگاه های ثبت شده</h4>
                </div>
                {!!comments ? <>
                    <div className={style.commentsList}>
                        {comments.length ? comments.map(c => {
                            return (
                                <div className={style.comment} key={c.id}>
                                    <div className={style.right}>
                                        <Link href={`/products/${c.product.id}`}>
                                            <div className={style.image}><img src={c.product.image} alt={c.product.name} /></div>
                                        </Link>
                                        <div className={style.rateBox}>
                                            <span className={style.rate} style={{ background: (c.rate > 3) ? '#00a049' : '#f9bc00' }}>
                                                {e2p(c.rate)}</span>
                                        </div>
                                    </div>
                                    <div className={style.left}>
                                        <div className={style.top}>
                                            <div className={style.name}>
                                                <span className={style.time}>{new Date(c.time).toLocaleDateString('fa-IR', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' })}</span>
                                                <p>{c.product.name}</p>
                                            </div>
                                            <div className={style.more}>
                                                <div className={style.situation}>رد شده</div>
                                                <div className={style.option}>
                                                    <div className={style.svg}>
                                                        <BsThreeDotsVertical />
                                                    </div>
                                                    <ul className={style.menu} >
                                                        <li className={style.menu_item}>
                                                            <BsPen /> ویرایش دیدگاه
                                                        </li>
                                                        <li className={style.menu_item}>
                                                            <BsTrash fill='red' /> حذف دیدگاه
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <p className={style.text}>{c.text}</p>
                                    </div>
                                </div>
                            )
                        }) : <div className={style.empty}>
                            <div className={style.pHvtxu}>
                                <div className={style.pic}>
                                    <img src={img.src} alt="" />
                                </div>
                                <p>هنوز هیچ سفارشی ندادید</p>
                            </div>
                        </div>}
                    </div>
                    <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} dataLength={pagination.meta.total} boxShadow={false} />
                </> : <Loading />}
            </div>
        </>
    );
};

export default Comments;