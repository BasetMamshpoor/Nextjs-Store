import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Specifications from 'Components/Detaile/Specifications';
import Comments from 'Components/Detaile/Comments';
import Stock from 'Components/Detaile/Stock';
import DetaileSlider from 'Components/Slider/DetaileSlider'
import style from './Detaile.module.css'
import Attributes from 'Components/Detaile/Attributes';
import { AiOutlineSafety, AiOutlineFieldTime } from 'react-icons/ai'
import { BsTruck } from 'react-icons/bs'
import Baner from 'Components/Detaile/Baner';
import useGetPrivatRequest from 'hooks/useGetPrivatRequest';
import Breadcrumb from 'Components/Breadcrumb';
import Loading from 'Components/Loading';
import OfferTime from 'Components/Detaile/OfferTime';

const ProductDetaile = () => {
    const router = useRouter()

    const { id } = router.query
    const [data, setData, reload] = useGetPrivatRequest(`/products/show/${id}`)

    const [size, setSize] = useState({})

    useEffect(() => {
        if (!!data) setSize(data.product.sizes[0])
    }, [data])

    return (
        <>
            <main className={style.main}>
                {!!data ? <>
                    <section dir='rtl'>
                        <div className="container">
                            <Breadcrumb breadcrumb={data.breadcrumb} />
                        </div>
                    </section>

                    <section className={style.Iwalh}>
                        <div className="container">
                            {!!data.product ? <div className={`row pb-3 ${style.mobile_Dis}`}>
                                <div className="col-lg-7 d-flex flex-column" dir="rtl">
                                    <div className={style.Cxwply}>
                                        <h1>{data.product.name}</h1>
                                    </div>
                                    <div className="row flex-grow-1">
                                        <div className={`col-lg-${!!data.product.sizes.length ? '6' : '12'} ps-0`}>
                                            <Attributes product={data.product} />
                                        </div>
                                        {!!data.product.sizes.length && <div className="col-lg-6 p-0">
                                            <div className={style.esohby}>
                                                <div className={style.cKyf}>
                                                    <div className={style.pxty}>
                                                        <AiOutlineSafety />
                                                    </div>
                                                    <span>ضمانت اصل بودن و سلامت کالا</span>
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
                                        </div>}
                                    </div>
                                    <Stock product={data.product} size={size} setSize={setSize} />
                                </div>
                                <div className="col-lg-5">
                                    {!!data.product.off_date_to && <OfferTime off_date_to={data.product.off_date_to} />}
                                    <DetaileSlider Images={data.product.images} isBookmarked={data.product.isBookmarked} id={data.product.id} />
                                </div>
                            </div> : <Loading />}
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

                                <div className="col-lg-9 ps-3">
                                    <Specifications data={data.product.attributes} />

                                    <Comments id={id} rate={data.product.rate} />
                                </div>

                                <div className="col-lg-3 p-0">
                                    <Baner product={data.product} size={size} />
                                </div>
                            </div>

                        </div>
                    </section>
                </> : <Loading />}
            </main>
        </>
    );
};

export default ProductDetaile;