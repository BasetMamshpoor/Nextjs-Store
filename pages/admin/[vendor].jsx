import React from 'react';
import Form from 'Components/Vendor/Form';
import style from './Vendor.module.css'
import Link from 'next/link';
import { RxDashboard } from 'react-icons/rx'
import { GiClothes } from 'react-icons/gi'
import { MdOutlineFileUpload, MdSettings } from 'react-icons/md'
import { BsCart3 } from 'react-icons/bs'
import { FiSliders } from 'react-icons/fi';
import { useRouter } from 'next/router';
import Slider from 'Components/Vendor/Slider';




const Vendor = () => {
    const router = useRouter()
    const { vendor } = router.query
    return (
        <>
            <main>
                <div className={style.jhhuPxe} dir="rtl">
                    <div className="container">
                        <div className="row">
                            <div className="col-3 ps-3 pe-0">
                                <div className={style.loVgtSw_5Q}>
                                    <ul className={style.OcWz_yc1a}>
                                        <li>
                                            <Link href="/admin/dashboard" className={`${style.JbxnrS_6g6d} ${vendor === 'dashboard' ? style.JbxnrS_active : null}`}>
                                                <div className={style.cxZw_p112}>
                                                    <div>
                                                        <RxDashboard />
                                                    </div>
                                                    <p>داشبورد</p>
                                                </div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/admin/products" className={`${style.JbxnrS_6g6d} ${vendor === 'products' ? style.JbxnrS_active : null}`}>
                                                <div className={style.cxZw_p112}>
                                                    <div>
                                                        <GiClothes />
                                                    </div>
                                                    <p>محصولات</p>
                                                </div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/admin/new-product" className={`${style.JbxnrS_6g6d} ${vendor === 'new-product' ? style.JbxnrS_active : null}`}>
                                                <div className={style.cxZw_p112}>
                                                    <div>
                                                        <MdOutlineFileUpload />
                                                    </div>
                                                    <p>اضافه کردن محصول جدید</p>
                                                </div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/admin/slider" className={`${style.JbxnrS_6g6d} ${vendor === 'slider' ? style.JbxnrS_active : null}`}>
                                                <div className={style.cxZw_p112}>
                                                    <div>
                                                        <FiSliders />
                                                    </div>
                                                    <p>اسلایدر</p>
                                                </div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/admin/orders" className={`${style.JbxnrS_6g6d} ${vendor === 'orders' ? style.JbxnrS_active : null}`}>
                                                <div className={style.cxZw_p112}>
                                                    <div>
                                                        <BsCart3 />
                                                    </div>
                                                    <p>سفارشات</p>
                                                </div>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href=" " className={`${style.JbxnrS_6g6d} ${vendor === '' ? style.JbxnrS_active : null}`}>
                                                <div className={style.cxZw_p112}>
                                                    <div>
                                                        <MdSettings />
                                                    </div>
                                                    <p>تغییر مشخصات</p>
                                                </div>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-9">
                                {vendor === 'new-product' && <Form />}
                                {vendor === 'slider' && <Slider />}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export async function getStaticPaths() {

    return {
        paths: [
            { params: { vendor: 'new-product' } },
            { params: { vendor: 'dashboard' } },
            { params: { vendor: 'products' } },
            { params: { vendor: 'slider' } },
            { params: { vendor: 'orders' } },
        ],
        fallback: false
    }
}
export async function getStaticProps() {

    return {
        props: {}
    }
}

export default Vendor;