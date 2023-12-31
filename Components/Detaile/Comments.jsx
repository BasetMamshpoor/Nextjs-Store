import createModal from 'Components/Modal';
import { e2p } from 'Functions/ConvertNumbers';
import { useEffect, useState } from 'react';
import Pagination from '../Pagination/Pagination';
import AddComment from './AddComment';
import style from './Comments.module.css'
import { BsThreeDotsVertical } from 'react-icons/bs'
import axios from 'axios';

const Comments = ({ id, rate }) => {

    const [currentpage, setCurrentpage] = useState(1)

    const [comments, setComments] = useState()

    useEffect(() => {
        const get = async () => {
            await axios.get(`/products/show/${id}/comments`, { params: { page: currentpage } })
                .then(res => setComments(res.data))
                .catch(err => console.log(err))
        }
        get()
    }, [currentpage])


    return (
        <>
            <div className={style.r0Oi2} id="comments">
                <div className={style.x3qao_hj}>
                    <h5>امتیاز و نظرات</h5>
                    <p className={style.totalComments}>تعداد کل دیدگاه ها: <span>{!!comments && e2p(comments.meta.total)}</span></p>
                </div>
                {!!comments && <div className="row">
                    <div className="col-lg-3 ps-0">
                        <div className={style.cxyrd3}>
                            <div className={style.G4xP0sm3}>
                                <p className={style.cxr8Jve}>{e2p(rate)}</p>
                                <p>از ۵</p>
                            </div>
                            <div className={style.cs3qp}>
                                <p>شما هم درباره این کالا دیدگاه ثبت کنید.</p>
                                <button className={style.exW3mo} onClick={() => createModal(<AddComment id={id} />)}>ثبت دیدگاه</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        {comments.data.map(c => {
                            return (<article className={style.comment} key={c.id}>
                                <div className={style.qzoY3_jl}>
                                    <div className={style.pExiP} rate={c.rate}><span>{e2p(c.rate)}</span></div>
                                    <div className={style.C_Header}>
                                        <p className={style.C_time}>{"دوشنبه ۱۴۰۲/۲/۴"}</p>
                                        <p className={style.C_name}>{c.user}</p>
                                    </div>
                                    <div className={style.Qzoli_2}>
                                        <BsThreeDotsVertical />
                                    </div>
                                </div>
                                <div className={style.wzO0lp}>
                                    <div className={style.Wx33_E}></div>
                                    <p className={style.C_body}>{c.text}</p>
                                </div>
                            </article>)
                        })}
                        <Pagination currentPage={currentpage} setCurrentPage={setCurrentpage} dataLength={comments.meta.total} itemsPerPage={comments.meta.per_page} boxShadow={false} />
                    </div>
                </div>}
            </div>
        </>
    );
};



export default Comments;