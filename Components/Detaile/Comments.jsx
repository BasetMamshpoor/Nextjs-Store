import createModal from 'Components/Modal';
import { e2p } from 'Functions/ConvertNumbers';
import useRequest from 'hooks/useRequest';
import { useState } from 'react';
import Pagination from '../Pagination/Pagination';
import AddComment from './AddComment';
import style from './Style.module.css'

const Comments = ({ id, rate }) => {

    const [currentpage, setCurrentpage] = useState(1)

    const [comments] = useRequest(`/products/show/${id}/comments?page=${currentpage}`)

    return (
        <>
            <div className={style.r0Oi2} id="comments">
                <div className={style.x3qao_hj}>
                    <h5>امتیاز و نظرات</h5>
                    <p className={style.totalComments}>تعداد کل دیدگاه ها: <span>{!!comments && e2p(comments.meta.total)}</span></p>
                </div>
                {!!comments && <div className="row">
                    <div className="col-3 ps-0">
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
                    <div className="col-9">
                        {comments.data.map(c => {
                            return (<article className={style.comment} key={c.id}>
                                <div className={style.qzoY3_jl}>
                                    <div className={style.pExiP} rate={c.rate}><span>{e2p(c.rate)}</span></div>
                                    <div className={style.C_Header}>
                                        <p className={style.C_time}>{"دوشنبه ۱۴۰۲/۲/۴"}</p>
                                        <p className={style.C_name}>{c.user}</p>
                                    </div>
                                    <div className={style.Qzoli_2}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor"
                                            viewBox="0 0 16 16">
                                            <path
                                                d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                        </svg>
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