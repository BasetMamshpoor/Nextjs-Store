import createModal from 'Components/Modal';
import { e2p } from 'Functions/ConvertNumbers';
import { useContext, useState } from 'react';
import Pagination from '../Pagination/Pagination';
import AddComment from './AddComment';
import style from './Comments.module.css'
import { BsThreeDotsVertical } from 'react-icons/bs'
import useGetRequest from 'hooks/useGetRequest';
import Loading from 'Components/Loading';
import { Functions } from 'providers/FunctionsProvider';
import { useRouter } from 'next/router';
import { Authorization } from 'providers/AuthorizationProvider';

const Comments = ({ id, rate }) => {
    const router = useRouter()
    const [currentpage, setCurrentpage] = useState(1)
    const { SwalStyled } = useContext(Functions)
    const { user } = useContext(Authorization)
    const [comments, setComments, reload, pagination] = useGetRequest(`/products/show/${id}/comments`, currentpage)


    return (
        <>
            {!!comments ? <div className={`${style.r0Oi2} ${style.r0Oi3}`} id="comments">
                <div className={style.x3qao_hj}>
                    <h5>امتیاز و نظرات</h5>
                    <p className={style.totalComments}>تعداد کل دیدگاه ها: <span>{!!pagination && e2p(pagination.meta.total)}</span></p>
                </div>
                <div className="row">
                    <div className="col-lg-3 ps-0">
                        <div className={style.cxyrd3}>
                            <div className={style.G4xP0sm3}>
                                <p className={style.cxr8Jve}>{e2p(rate)}</p>
                                <p>از ۵</p>
                            </div>
                            {!user.is_admin && <div div className={style.cs3qp}>
                                <p>شما هم درباره این کالا دیدگاه ثبت کنید.</p>
                                <button className={style.exW3mo} onClick={() => createModal(<AddComment push={router.push} SwalStyled={SwalStyled} id={id} />)}>ثبت دیدگاه</button>
                            </div>}
                        </div>
                    </div>
                    <div className="col-lg-9">
                        {comments.length ? comments.map(c => {
                            return (<article className={style.comment} key={c.id}>
                                <div className={style.qzoY3_jl}>
                                    <div className={style.pExiP} rate={c.rate}><span>{e2p(c.rate)}</span></div>
                                    <div className={style.C_Header}>
                                        <p className={style.C_time}>{new Date(c.time).toLocaleDateString('fa-IR', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' })}</p>
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
                        }) : <p className={style.empty_comment}>اولین نفری باشید که برای این محصول نظر می دهید</p>}
                        <Pagination currentPage={currentpage} setCurrentPage={setCurrentpage} dataLength={pagination.meta.total} itemsPerPage={pagination.meta.per_page} boxShadow={false} />
                    </div>
                </div>
            </div > : <Loading />
            }
        </>
    );
};



export default Comments;