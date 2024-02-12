import style from './Address.module.css'
import { IoLocationSharp } from 'react-icons/io5'
import { FiEdit3 } from 'react-icons/fi'
import { BsTrash, BsPerson, BsTelephone } from 'react-icons/bs'
import { GoMail } from 'react-icons/go'
import { e2p } from 'Functions/ConvertNumbers'
import useGetPrivetRequest from 'hooks/useGetPrivetRequest'
import Pagination from 'Components/Pagination/Pagination'

const Address = () => {

    const [addresses] = useGetPrivetRequest('/profile/addresses')

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
                        <button className={style.OTxe3_M}>ثبت آدرس جدید</button>
                    </div>
                    <div className={style.Ubx7_O3}>
                        {!!addresses && addresses.map(a => {
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
                        })}
                    </div>
                    <Pagination setCurrentPage={(e) => console.log(e)} boxShadow={false} />
                </div>
            </div>
        </>
    );
};

export default Address;