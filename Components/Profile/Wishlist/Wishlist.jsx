import style from './Wishlist.module.css'
import { BsHeartFill, BsCart3, BsTrash } from 'react-icons/bs'
import Link from 'next/link';
import addComma from 'Functions/addComma';
import { e2p } from 'Functions/ConvertNumbers';
import useGetPrivatRequest from 'hooks/useGetPrivatRequest';
import Pagination from 'Components/Pagination/Pagination';
import Image from 'next/image';
import { useContext, useState } from 'react';
import img from 'public/Images/favorites-list-empty.svg'
import Loading from 'Components/Loading';
import axios from 'axios';
import { Authorization } from 'providers/AuthorizationProvider';
import { Functions } from 'providers/FunctionsProvider';

const Wishlist = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [wish, setWish, reload, pagination] = useGetPrivatRequest('/profile/bookmarks', currentPage, { items_perpage: 9 })
    const { tokens } = useContext(Authorization)
    const { SwalStyled } = useContext(Functions)
    const headers = {
        Authorization: `${tokens.token_type} ${tokens.access_token}`
    }
    const handleDelete = (id) =>
        SwalStyled.fire({
            title: 'حذف',
            text: 'آیا از حذف محصول از لیست علاقه مندی اطمینان دارید؟',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'بله',
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        }).then(async (result) => {
            if (result.isConfirmed)
                await axios.post('/bookmark', { product_id: id }, { headers })
                    .then(res => {
                        SwalStyled.fire('تایید شد', res.data.message, 'success')
                        reload(Math.random())
                    })
        })


    return (
        <>
            <div className={style.t7_Bf_O} dir="rtl">
                <div className={style.to0_RT_3}>
                    <div className={style.uE2X0_Qz}>
                        <div className={style.rP4_Zk}>
                            <BsHeartFill />
                        </div>
                        <h5>لیست علاقه مندی های من</h5>
                    </div>
                    {!!pagination ? <>
                        <div className={style.D3a_tVu9}>
                            {wish.length > 0 ? wish.map(i => {
                                const { id, product } = i
                                return (
                                    <>
                                        {product && <div className={style.gali9_y} key={id}>
                                            <Link href={`/products/${product.id}`} className={style.KK7f_ouq}>
                                                <div className={style.hyyCr4_A}>
                                                    <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={100} height={100} unoptimized={true} src={product.image} alt="" />
                                                </div>
                                            </Link>
                                            <div className={style.LassOing_R}>
                                                <Link href={`/product/${product.id}`} className={style.fWcA4_Z}>
                                                    {product.name}
                                                </Link>
                                                {!!product.is_available ?
                                                    <div className={style.OtDah2_1}>
                                                        <div className={style.nJxe3_iu}>
                                                            <p className={style.iBrJ6_e}>{addComma(product.offPrice.toString())}</p>
                                                            {product.price !== product.offPrice && <span className={style.Off_persant_haZi}>%{e2p(product.offPercent)}</span>}
                                                        </div>
                                                        {product.price !== product.offPrice && <p className={style.Off_3X5}>{addComma(product.price.toString())}</p>}
                                                    </div> :
                                                    <div className={style.etmamMojody}>
                                                        <b>ناموجود</b>
                                                    </div>}
                                                <div className={style.Add_obgUw}>
                                                    {product.is_available && <Link href={`/product/${product.id}`} onClick={e => e.preventDefault()} className={style.AdDPIc3_}>
                                                        <span>افزودن به لیست</span>
                                                        <BsCart3 />
                                                    </Link>}
                                                    <button className={style.remove_iCrx4} onClick={() => handleDelete(product.id)}>
                                                        <span>حذف</span>
                                                        <BsTrash />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>}
                                    </>
                                )
                            }) :
                                <div className={style.empty}>
                                    <div className={style.pHvtxu}>
                                        <div className={style.pic}>
                                            <img src={img.src} alt="" />
                                        </div>
                                        <p>لیست علاقه‌مندی‌های شما خالی است.</p>
                                    </div>
                                </div>}
                        </div>
                        <Pagination currentPage={currentPage} setCurrentPage={(e) => setCurrentPage(e)} dataLength={pagination.meta.total} itemsPerPage={pagination.meta.per_page} boxShadow={false} />
                    </> : <Loading />}
                </div>
            </div>
        </>
    );
};

export default Wishlist;