import Link from 'next/link';
import React from 'react';
import style from './Product.module.css'
import { e2p } from 'Functions/ConvertNumbers';
import addComma from 'Functions/addComma';

const Product = ({ id, name, price, off_percent, off_price }) => {
    return (
        <>
            <div className={style.Xqera} key={id}>
                <Link href={`/products/${id}`}>
                    <div className={style.imgP}>
                        <img src="images/product/111328697.jpg" alt="" />
                    </div>
                    <div className={style.descP}>
                        <p>{name}</p>
                    </div>
                    <div className={style.priceP}>
                        <div className={style.Cpou}>
                            <span className={style.priceR}>{addComma(off_price)}</span>
                            {price !== off_price && <span>%{e2p(off_percent)}</span>}
                        </div>
                        {price !== off_price && <del>{addComma(price)}</del>}
                    </div>
                </Link>
            </div>
        </>
    );
};

export default Product;