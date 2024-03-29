import Link from 'next/link';
import style from './Product.module.css'
import { e2p } from 'Functions/ConvertNumbers';
import addComma from 'Functions/addComma';
import Image from 'next/image';
import Timer from 'Components/Timer';
import { FaStar } from "react-icons/fa";

const Product = ({ id, name, price, rate, offPercent, offPrice, image, off_date_to, is_available }) => {
    const timeDiscount = ((new Date(off_date_to).getTime() - new Date().getTime()) / 1000)
    return (
        <>
            <div className={style.Xqera}>
                <Link href={`/products/${id}`}>
                    <div className={style.imgP}>
                        <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={100} height={100} unoptimized={true} src={image} alt="" />
                    </div>
                    <div className={style.info}>
                        <div className={style.descP}>
                            <h3>{name}</h3>
                        </div>
                        {rate > 0 && <div className={style.rate}>
                            <span>{e2p(rate)}</span>
                            <div className={style.star}><FaStar /></div>
                        </div>}
                        {is_available ? <div className={style.priceP}>
                            <div className={style.Cpou}>
                                <span className={style.priceR}>{addComma(offPrice.toString())}</span>
                                {price !== offPrice && <span>%{e2p(offPercent)}</span>}
                            </div>
                            {price !== offPrice && <del>{addComma(price.toString())}</del>}
                            {!!off_date_to && (timeDiscount < 86400) && <>
                                <Timer message='اتمام تخفیف' time={timeDiscount} classNameProgress={style.progress} classNameTimer={style.timer} classNameEtmam={style.EtmamTakhfif} />
                            </>}
                        </div> :
                            <div className={style.etmamMojody}>
                                <b>ناموجود</b>
                            </div>}
                    </div>
                </Link>
            </div>
        </>
    );
};

export default Product;