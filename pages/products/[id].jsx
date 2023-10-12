import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Specifications from 'Components/Detaile/Specifications';
import Comments from 'Components/Detaile/Comments';
import Stock from 'Components/Detaile/Stock';
import DetaileSlider from 'Components/Slider/DetaileSlider'
import style from './Detaile.module.css'
import Attributes from 'Components/Detaile/Attributes';

import { AiOutlineSafety, AiOutlineFieldTime } from 'react-icons/ai'
import { BsTruck } from 'react-icons/bs'
import Baner from 'Components/Detaile/Baner';
import Image from 'next/image';

const ProductDetaile = () => {
    const router = useRouter()
    const { id } = router.query
    const [product, setProduct] = useState()
    const [size, setSize] = useState()

    useEffect(() => {
        const get = async () => {
            if (id) {
                await axios.get(`/products/show/${id}`)
                    .then(res => {
                        setSize(res.data.data.sizes[0])
                        setProduct(res.data.data)
                    })
                    .catch(err => console.log(err))
            }
        }
        get()
    }, [id])


    return (
        <>
            {product ? <main>
                <section className={style.Iwalh}>
                    <div className="container">
                        {product && <div className="row pb-3">
                            <div className="col-7 d-flex flex-column" dir="rtl">
                                <div className={style.Cxwply}>
                                    <h1>{product.name}</h1>
                                </div>
                                <div className="row flex-grow-1">
                                    <div className="col-6 ps-0">
                                        <Attributes product={product} />
                                    </div>
                                    <div className="col-6 p-0 mt-4">
                                        <div className={style.esohby}>
                                            <div className={style.cKyf}>
                                                <div className={style.pxty}>
                                                    <AiOutlineSafety />
                                                </div>
                                                <span>ضمانت اصل بودن کالا</span>
                                            </div>
                                            <div className={style.cKyf}>
                                                <div className={style.pxty}>
                                                    <BsTruck />
                                                </div>
                                                <span>ارسال فوری و آسان با پست</span>
                                            </div>
                                            <div className={style.cKyf}>
                                                <div className={style.pxty}>
                                                    <AiOutlineFieldTime />
                                                </div>
                                                <span>۲۴ ساعته و ۷ روز هفته</span>
                                            </div>
                                        </div>
                                        <div className={style.zOiOz}>
                                            <div className={`${style.Redxws} ${style.Fcesop}`}>
                                                <p>آماده ارسال</p>
                                            </div>
                                            <div className={`${style.Redxws} ${style.LttOp}`}>
                                                <p>گارانتی اصالت و سلامت فیزیکی کالا</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Stock product={product} size={size} setSize={setSize} />
                            </div>
                            <div className="col-5">
                                <DetaileSlider Images={product.images} />
                            </div>
                        </div>}
                    </div>
                </section>

                <section className={style.hFcte} dir="rtl">
                    <div className="container">

                        <div className={style.c9C4xp}>
                            <ul className={style.p_Eoxf}>
                                <li className={`${style.ycrQl} ${style.obActive}`}><a href="#Specifications">مشخصات</a></li>
                                <li className={style.ycrQl}><a href="#comments">نظرات</a></li>
                            </ul>
                        </div>

                        <div className="row">

                            <div className="col-9 ps-3">
                                <Specifications data={product.attributes} />

                                <Comments id={id} rate={product.rate} />
                            </div>

                            <div className="col-3 p-0">
                                <Baner product={product} size={size} />
                            </div>
                        </div>

                    </div>
                </section>

            </main> :
                <div className={style.Loading}>
                    <Image width={100} height={100} unoptimized={true} src='/Images/loading.gif' alt="" />
                </div>
            }
        </>
    );
};

export default ProductDetaile;