import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Specifications from 'Components/Detaile/Specifications';
import Comments from 'Components/Detaile/Comments';
import Stoke from 'Components/Detaile/Stoke';
import DetaileSlider from 'Components/Slider/DetaileSlider'
import style from './Detaile.module.css'
import Attributes from 'Components/Detaile/Attributes';

import { AiOutlineSafety, AiOutlineFieldTime } from 'react-icons/ai'
import { BsTruck } from 'react-icons/bs'

const ProductDetaile = () => {
    const router = useRouter()
    const { id } = router.query
    const [product, setProduct] = useState()

    useEffect(() => {
        const get = async () => {
            if (id) {
                await axios.get(`/products/${id}`)
                    .then(res => setProduct(res.data))
                    .catch(err => console.log(err))
            }
        }
        get()
    }, [id])


    return (
        <>
            <main>
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
                                <Stoke product={product} />
                            </div>
                            <div className="col-5">
                                <DetaileSlider />
                            </div>
                        </div>}
                    </div>
                </section>

                <section className="hFcte" dir="rtl">
                    <div className="container">

                        <div className="c9C4xp border-bottom">
                            <ul className="p-Eoxf">
                                <li className="ycrQl obActive"><a href="#Specifications">مشخصات</a></li>
                                <li className="ycrQl"><a href="#comments">نظرات</a></li>
                            </ul>
                        </div>

                        <div className="row">

                            <div className="col-9 ps-3">
                                <Specifications />

                                <Comments />
                            </div>

                            <div className="col-3 p-0">
                                <div className="jc4Rg my-4">
                                    <div className="r4Alju d-flex border-bottom py-2">
                                        <div className="diSwk6 ms-2">
                                            <img src="images/details/edc7019fd30600304ff9acb5178a2b04cf0a5a1f_1630735755.jpg"
                                                alt="" />
                                        </div>
                                        <div className="UyrpV7 flex-grow-1">
                                            <p>تیشرت مردانه باینت مدل 2261438-5459</p>
                                        </div>
                                    </div>
                                    <div className="gtBwx_d d-flex flex-column border-bottom">
                                        <div className="uv4FOo">
                                            <div className="ivrxo5">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                    className="bi bi-building" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd"
                                                        d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z" />
                                                    <path
                                                        d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z" />
                                                </svg>
                                            </div>
                                            نایک
                                        </div>
                                        <div className="uv4FOo">
                                            <div className="ivrxo5">
                                                <svg fill="currentColor" viewBox="0 0 16 16">
                                                    <path
                                                        d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z">
                                                    </path>
                                                    <path
                                                        d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z">
                                                    </path>
                                                </svg>
                                            </div>
                                            گارانتی سلامت فیزیکی کالا
                                        </div>
                                        <div className="uv4FOo">
                                            <div className="ivrxo5">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                    className="bi bi-life-preserver" viewBox="0 0 16 16">
                                                    <path
                                                        d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm6.43-5.228a7.025 7.025 0 0 1-3.658 3.658l-1.115-2.788a4.015 4.015 0 0 0 1.985-1.985l2.788 1.115zM5.228 14.43a7.025 7.025 0 0 1-3.658-3.658l2.788-1.115a4.015 4.015 0 0 0 1.985 1.985L5.228 14.43zm9.202-9.202-2.788 1.115a4.015 4.015 0 0 0-1.985-1.985l1.115-2.788a7.025 7.025 0 0 1 3.658 3.658zm-8.087-.87a4.015 4.015 0 0 0-1.985 1.985L1.57 5.228A7.025 7.025 0 0 1 5.228 1.57l1.115 2.788zM8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                                                </svg>
                                            </div>
                                            موجود در انبار
                                        </div>
                                    </div>
                                    <div className="Ec3obT py-2">
                                        <div className="vfdC mb-2">
                                            <span className="Roff">۴۹٪</span>
                                            <del className="Crprice">۵,۷۷۷,۰۰۰</del>
                                        </div>
                                        <div className="P_priceR">
                                            ۳,۸۹۵,۰۰۰
                                        </div>
                                    </div>
                                    <div className="Tpn9Rq">
                                        <button className="aDd-tO-CaRt">افزودن به سبد</button>
                                        <div className="Xdptve13" hidden>
                                            <button className="inCr_p">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                    viewBox="0 0 16 16">
                                                    <path
                                                        d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                                </svg>
                                            </button>
                                            <span className="NamBer_P">۱</span>
                                            <button className="deCri_p">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                    viewBox="0 0 16 16">
                                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="VdxwPuu me-2" hidden>
                                            مشاهده در
                                            <a href=".">سبد خرید</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

            </main>
        </>
    );
};

export default ProductDetaile;