import style from './Address.module.css'
import { IoLocationSharp } from 'react-icons/io5'
import { FiEdit3 } from 'react-icons/fi'
import { BsTrash, BsPerson, BsTelephone } from 'react-icons/bs'
import { GoMail } from 'react-icons/go'
import { e2p } from 'Functions/ConvertNumbers'
import useGetPrivatRequest from 'hooks/useGetPrivatRequest'
import Pagination from 'Components/Pagination/Pagination'
import { useContext, useState } from 'react'
import Loading from 'Components/Loading'
import img from 'public/Images/address.svg'
import createModal from 'Components/Modal'
import AddAddress from './AddAddress'
import { Functions } from 'providers/FunctionsProvider'

const Address = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [addresses, setAddress, reload, pagination] = useGetPrivatRequest('/profile/addresses')
    const { SwalStyled } = useContext(Functions)

    return (
        <>
            <div className={style.YxaZev_5q} dir="rtl">
                <div className={style.iG_8Lo}>
                    <div className={style.ExolP_3}>
                        <div className={style.KnbYc__9}>
                            <div className={style.KnbYc__10}>
                                <IoLocationSharp />
                            </div>
                            <h5>آدرس ها</h5>
                        </div>
                        <button className={style.OTxe3_M} onClick={() => createModal(<AddAddress reload={reload} SwalStyled={SwalStyled} />)}>ثبت آدرس جدید</button>
                    </div>
                    {!!pagination ? <>
                        <div className={style.Ubx7_O3}>
                            {addresses.length > 0 ? addresses.map(a => {
                                return (
                                    <div className={style.oInGt07_}>
                                        <div className={style.olCqz8_PP}>
                                            <p className={style.ObcjZo_e3}>{a.title}</p>
                                            <div className={style.cPx_iiRxQ67}>
                                                <div>
                                                    <FiEdit3 />
                                                </div>
                                                <div>
                                                    <BsTrash />
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.VxpQl5H_0}>
                                            <div className={style.NbvWzpo}>
                                                <label>آدرس : </label>
                                                <p className={style.loMnw}>{a.province} - {a.city} - {a.address}</p>
                                            </div>
                                            <div className={style.LGtcmnD_3}>
                                                <label>مشخصات گیرنده </label>
                                                <div className={style.FazWlNmh_i}>
                                                    <div className={style.IbCh_1QzTM}>
                                                        <div>
                                                            <BsPerson />
                                                        </div> {a.name}
                                                    </div>
                                                    <div className={style.IbCh_1QzTM}>
                                                        <div>
                                                            <BsTelephone />
                                                        </div> {e2p(a.cellphone)}
                                                    </div>
                                                    <div className={style.IbCh_1QzTM}>
                                                        <div>
                                                            <GoMail />
                                                        </div> {e2p(a.postalcode)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) :
                                <div className={style.empty}>
                                    <div className={style.pHvtxu}>
                                        <div className={style.pic}>
                                            <img src={img.src} alt="" />
                                        </div>
                                        <p>هنوز آدرس ثبت نکرده‌اید.</p>
                                    </div>
                                </div>}
                        </div>
                        <Pagination currentPage={currentPage} setCurrentPage={(e) => setCurrentPage(e)} dataLength={pagination.meta.total} boxShadow={false} />
                    </> : <Loading />}
                </div>
            </div>
        </>
    );
};

export default Address;