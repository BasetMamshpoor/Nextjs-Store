import Link from 'next/link';
import style from './Product.module.css'
import { e2p } from 'Functions/ConvertNumbers';
import addComma from 'Functions/addComma';
import Image from 'next/image';

const Product = ({ id, name, price, offPercent, offPrice, image, off_date_to }) => {
    return (
        <>
            <div className={style.Xqera}>
                <Link href={`/products/${id}`}>
                    <div className={style.imgP}>
                        <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={100} height={100} unoptimized={true} src={image} alt="" />
                    </div>
                    <div className={style.descP}>
                        <h3>{name}</h3>
                    </div>
                    <div className={style.priceP}>
                        <div className={style.Cpou}>
                            <span className={style.priceR}>{addComma(offPrice.toString())}</span>
                            {price !== offPrice && <span>%{e2p(offPercent)}</span>}
                        </div>
                        {price !== offPrice && <del>{addComma(price.toString())}</del>}
                        {!!off_date_to && ((new Date(off_date_to).getTime() - new Date().getTime()) / 1000)}
                    </div>
                </Link>
            </div>
        </>
    );
};

export default Product;