import Link from 'next/link';
import style from './Product.module.css'
import { e2p } from 'Functions/ConvertNumbers';
import addComma from 'Functions/addComma';
import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';
import { PiDotsThreeOutlineVerticalFill, PiTrashLight } from "react-icons/pi";
import axios from 'axios';
import { Functions } from 'providers/FunctionsProvider';
import Cookies from 'js-cookie';

const Product = ({ id, name, price, offPercent, offPrice, image, setProducts }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dots = useRef()
    const token = Cookies.get('token')
    const headers = { 'Content-Type': 'multipart/form-data', Authorization: `${token.token_type} ${token.access_token}` }
    const { SwalStyled } = useContext(Functions)

    const handleOpen = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        window.addEventListener('click', handler)
        return () => window.addEventListener('click', handler)
    }, [])

    const handler = (e) => {
        if (dots.current && !dots.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    const handleDelete = async () => {
        SwalStyled.fire({
            title: "از حذف محصول اطمینان دارید؟",
            text: 'با حذف محصول بازگردانی آن امکان پذیر نخواهد بود',
            showDenyButton: true,
            confirmButtonText: "حذف",
            denyButtonText: `لغو`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`/admin/products/${id}`, { headers })
                    .then(() => {
                        SwalStyled.fire({ title: '.حذف شد', text: '.محصول مورد نظر با موفقیت حذف شد', icon: 'success' })
                        setProducts(prev => {
                            const newProductsList = prev.filter(p => p.id !== id)
                            return newProductsList
                        })
                    }).catch(() => {
                        SwalStyled.fire('.حذف نشد', '.محصول مورد نظر با موفقیت حذف نشد', 'error')
                    })
            } else if (result.isDenied) {
                SwalStyled.fire("حذف لغو شد.", "", "info");
            }
        });
    }

    return (
        <>
            <div className={style.Xqera}>
                <Link href={`/products/${id}`}>
                    <div className={style.imgP}>
                        <Image placeholder='blur' blurDataURL='/Images/placeholder-1.png' width={100} height={100} unoptimized={true} src={image} alt="" />
                    </div>
                    <div className={style.about}>
                        <div className={style.descP}>
                            <h3>{name}</h3>
                        </div>
                        <div className={style.priceP}>
                            <div className={style.Cpou}>
                                <span className={style.priceR}>{addComma(offPrice.toString())}</span>
                                {price !== offPrice && <span>%{e2p(offPercent)}</span>}
                            </div>
                            {price !== offPrice && <del>{addComma(price.toString())}</del>}
                        </div>
                    </div>
                </Link>
                <div className={style.option}>
                    <span className={style.dots} ref={dots} onClick={handleOpen}><PiDotsThreeOutlineVerticalFill /></span>
                    {isOpen ? (
                        <ul className={style.menu} >
                            <li className={style.menu_item} onClick={handleDelete}>
                                حذف <PiTrashLight />
                            </li>
                        </ul>
                    ) : null}

                </div>
            </div>
        </>
    );
};

export default Product;