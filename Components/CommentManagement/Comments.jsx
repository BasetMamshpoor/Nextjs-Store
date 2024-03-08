import { e2p } from 'Functions/ConvertNumbers';
import style from './Comments.module.css'
import useGetPrivatRequest from 'hooks/useGetPrivatRequest'
import Link from 'next/link';
import { useContext, useState } from 'react';
import { BsThreeDotsVertical, BsTrash, BsPen } from "react-icons/bs";
import { MdClose, MdCheck } from "react-icons/md";
import Loading from 'Components/Loading';
import Pagination from 'Components/Pagination/Pagination';
import { Authorization } from 'providers/AuthorizationProvider';
import { Functions } from 'providers/FunctionsProvider';
import axios from 'axios';
import img from 'public/Images/order.png'
import createModal from 'Components/Modal';
import AddComment from 'Components/Detaile/AddComment';


const Comments = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [tab, setTab] = useState(0)

    const { tokens, user } = useContext(Authorization)
    const { SwalStyled } = useContext(Functions)


    const Route = user.is_admin ? 'admin' : 'profile'
    const [comments, setComments, reload, pagination] = useGetPrivatRequest(`/${Route}/comments?approved=${tab}`, currentPage)

    const headers = {
        Authorization: `${tokens.token_type} ${tokens.access_token}`
    }

    const handleChangeStatue = async (id, approved) => {
        await axios.put(`admin/comments/change-status/${id}`, { approved }, { headers })
            .then(res => {
                SwalStyled.fire('ثبت شد', res.data.message, 'success')
                reload(Math.random())
            })
            .catch(err => {
                SwalStyled.fire('انجام نشد', err.response.data.message, 'error')
            })
    }

    const handleDelete = async (id) => {
        await axios.delete(`/${Route}/comments/${id}`, { headers })
            .then(res => {
                SwalStyled.fire('حذف شد', res.data.message, 'success')
                reload(Math.random())
            })
            .catch(err => {
                SwalStyled.fire('انجام نشد', err.response.data.message, 'error')
            })
    }


    return (
        <>
            <div className={style.comments}>
                <div className={style.container}>
                    <div className={style.navbar}>
                        <ul className={style.tabs}>
                            <li className={[style.tab, tab === 0 ? style.active : ''].join(' ')} onClick={() => { setTab(0), setCurrentPage(1) }}>در انتظار ثبت</li>
                            <li className={[style.tab, tab === 1 ? style.active : ''].join(' ')} onClick={() => { setTab(1), setCurrentPage(1) }}>دیدگاه ها</li>
                        </ul>
                    </div>
                    {!!comments ? <div className={style.content}>
                        <div className={style.commentsList}>
                            {comments.length ? comments.map(c => {
                                return (
                                    <div className={style.comment_section} key={c.id}>
                                        {!!user.is_admin && <div className={style.option_right}>
                                            {(c.approved === null || c.approved === 0) && <div className={[style.option_box, style.check].join(' ')} onClick={() => handleChangeStatue(c.id, 1)}><MdCheck /></div>}
                                            {(c.approved === null || c.approved === 1) && <div className={[style.option_box, style.close].join(' ')} onClick={() => handleChangeStatue(c.id, 0)}><MdClose /></div>}
                                        </div>}
                                        <div className={style.comment}>
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
                                                        {!!user.is_admin && <p>{c.user ?? 'ناشناس'}</p>}
                                                    </div>
                                                    <div className={style.more}>
                                                        <div className={style.situation} style={c.approved === null ? { borderColor: '#ccc', background: '#FFF', color: '#888' } :
                                                            c.approved === 1 ? { borderColor: 'green', background: 'rgba(0,255,0,0.1)', color: 'green' } : {}}>
                                                            {c.approved === null ? 'تعیین وضعیت نشده' : c.approved === 1 ? 'تایید شده' : 'رد شده'}</div>
                                                        {!user.is_admin && <div className={style.option}>
                                                            <div className={style.svg}>
                                                                <BsThreeDotsVertical />
                                                            </div>
                                                            <ul className={style.menu} >
                                                                <li className={style.menu_item} onClick={() => createModal(<AddComment state={c} SwalStyled={SwalStyled} />)}>
                                                                    <BsPen /> ویرایش دیدگاه
                                                                </li>
                                                                <li className={style.menu_item} onClick={() => handleDelete(c.id)}>
                                                                    <BsTrash fill='red' /> حذف دیدگاه
                                                                </li>
                                                            </ul>
                                                        </div>}
                                                    </div>
                                                </div>
                                                <p className={style.text}>{c.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) : <div className={style.empty}>
                                <div className={style.pHvtxu}>
                                    <div className={style.pic}>
                                        <img src={img.src} alt="" />
                                    </div>
                                    <p>هنوز دیدگاهی ثبت نشده</p>
                                </div>
                            </div>}
                        </div>
                        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} dataLength={pagination.meta.total} showLimit={3} itemsPerPage={pagination.meta.per_page} boxShadow={false} />
                    </div> : <Loading />}
                </div>
            </div >
        </>
    );
};

export default Comments;