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
import { Authorization } from 'providers/AuthorizationProvider'
import Image from 'next/image'
import axios from 'axios'

const Address = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [addresses, setAddress, reload, pagination] = useGetPrivatRequest('/profile/addresses', currentPage)
    const { SwalStyled } = useContext(Functions)
    const { tokens, user } = useContext(Authorization)
    const headers = { Authorization: `${tokens?.token_type} ${tokens?.access_token}` }

    const handleDelete = async (id) =>
        SwalStyled.fire({
            title: 'حذف',
            text: 'آیا از حذف آدرس اطمینان دارید؟',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'بله',
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        }).then(async (result) => {
            await axios.delete(`/address/${id}`, { headers })
                .then(res => {
                    SwalStyled.fire('.حذف شد', res.data.message, 'success')
                    reload(Math.random())
                })
                .catch(err => SwalStyled.fire('.حذف نشد', err.response.data.message, 'error'))
        })


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
                        <button className={style.OTxe3_M} onClick={() => createModal(<AddAddress reload={reload} SwalStyled={SwalStyled} user={{ ...user, ...tokens }} />)}>ثبت آدرس جدید</button>
                    </div>
                    {!!pagination ? <>
                        <div className={style.Ubx7_O3}>
                            {addresses.length > 0 ? addresses.map(a => {
                                const imageUrl = `https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/${a.latitude},${a.longitude}/${12}?mapSize=120,120&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}`
                                return (
                                    <div className={style.oInGt07_} key={a.id}>
                                        <div className={style.olCqz8_PP}>
                                            <p className={style.ObcjZo_e3}>{a.title}</p>
                                            <div className={style.cPx_iiRxQ67}>
                                                <div onClick={() => createModal(<AddAddress reload={reload} edit={a} SwalStyled={SwalStyled} user={{ ...user, ...tokens }} />)}>
                                                    <FiEdit3 />
                                                </div>
                                                <div onClick={() => handleDelete(a.id)}>
                                                    <BsTrash />
                                                </div>
                                            </div>
                                        </div>
                                        <div className={style.VxpQl5H_0}>
                                            <div className={style.NbvWzpo}>
                                                <label>آدرس : </label>
                                                <p className={style.loMnw}>{a.province} - {a.city} - {a.address}</p>
                                            </div>
                                            <div className={style.ybGtdrc}>
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
                                                <div className={style.simple_map_img}>
                                                    <Image src={!!imageUrl ? imageUrl : '/Images/placeholder-1.png'}
                                                        placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={100}
                                                        height={100} unoptimized={true} alt={a.address} />
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
            </div >
        </>
    );
};

export default Address;