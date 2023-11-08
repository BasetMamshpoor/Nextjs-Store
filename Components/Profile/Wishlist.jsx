import style from './Wishlist.module.css'
import { BsHeartFill, BsCart3, BsTrash } from 'react-icons/bs'
import Link from 'next/link';
import addComma from 'Functions/addComma';
import { e2p } from 'Functions/ConvertNumbers';
import useRequest from 'hooks/useRequest';
import Pagination from 'Components/Pagination/Pagination';
import Image from 'next/image';

const Wishlist = () => {

    const [wish] = useRequest('/profile/bookmarks')


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
                    <div className={style.D3a_tVu9}>
                        {wish?.map(i => {
                            const { id, product } = i
                            return (
                                <div className={style.gali9_y} key={id}>
                                    <Link href={`/product/${product.id}`} className={style.KK7f_ouq}>
                                        <div className={style.hyyCr4_A}>
                                        <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={100} height={100} unoptimized={true} src={product.image} alt="" />
                                        </div>
                                    </Link>
                                    <div className={style.LassOing_R}>
                                        <Link href={`/product/${product.id}`} className={style.fWcA4_Z}>
                                            {product.name}
                                        </Link>
                                        <div className={style.OtDah2_1}>
                                            <div className={style.nJxe3_iu}>
                                                <p className={style.iBrJ6_e}>{addComma(product.offPrice.toString())}</p>
                                                <span className={style.Off_persant_haZi}>%{e2p(product.offPercent)}</span>
                                            </div>
                                            <p className={style.Off_3X5}>{addComma(product.price.toString())}
                                            </p>
                                        </div>
                                        <div className={style.Add_obgUw}>
                                            <a href=" " onClick={e => e.preventDefault()} className={style.AdDPIc3_}>
                                                <span>افزودن به لیست</span>
                                                <BsCart3 />
                                            </a>
                                            <button className={style.remove_iCrx4}>
                                                <span>حذف</span>
                                                <BsTrash />
                                            </button>
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

export default Wishlist;