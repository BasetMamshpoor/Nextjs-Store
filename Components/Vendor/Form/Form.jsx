import React, { useState } from 'react';
import Input from '../../Input';
import style from './Form.module.css'
import SpecificationList from './Specifications/SpecificationsList'
import axios from 'axios';
import validation from 'Functions/AddProductValidation';
import { useRouter } from 'next/router';
import DropDown from 'Components/Dropdown/DropDown';
import Size from './Sizes';
import SizesList from './Sizes/SizesList';
import Specifications from './Specifications';
import Price from './Price';
import UploadImage from './UploadImage';
import { ImBoxAdd } from 'react-icons/im'

const Form = () => {
    const router = useRouter()
    const [product, setProduct] = useState({ category: [], sizes: [], specifications: [], imageList: [] })
    const [touch, setTouch] = useState({})

    const categoryList = [
        'مردانه',
        'لباس مردانه', 'زنانه', 'لباس زنانه',
        'کفش زنانه', 'کفش مردانه', 'بچه گانه',
        'پسرانه', 'ورزشی مردانه',
        'ورزشی زنانه',
    ]

    const errors = validation(product)

    const handleResult = (value, name) => {
        setProduct(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (Object.keys(errors).length) {
            setTouch({ name: true, brand: true, category: true, img: true, imageList: true, price: true, off_price: true, color: true, colorCode: true, sizes: true, specifications: true })
        } else {
            await axios.post('/products', product, { headers: { 'Content-Type': 'application/json' } })
                .then(() => router.push('/category-mens-clothing'))
        }

    }

    const categoryArray = () => {
        let array = [];
        categoryList.map((val, ind) => {
            array.push({ name: val, value: ind })
        })
        return array
    }

    const handleSelectCategory = (name, value) => {
        setProduct(prev => {
            return { ...prev, category: [...value] }
        })
    }

    return (
        <>
            <div className={style.Kce_1W2M4_6}>
                <div className={style.Hs_i8p4_gV}>
                    <div>
                        <ImBoxAdd />
                    </div>
                    <h6 className={style.qzE3_pNis__4}>افزودن محصول جدید</h6>
                </div>
                <div className={style.uTyc_3Waxd1}>
                    <form className={style.WzlProductAdd_tce} method="post" onSubmit={handleSubmit}>
                        <div className={style.DxwzE_Os_T3}>
                            <div className={style.nJe_3zq_plf}>
                                <Input type='text' placeholder="نام محصول" name='name' result={handleResult} className={style.input} />
                                {touch.name && errors.name && <span className={style.errors_input}>{errors.name}</span>}
                            </div>
                            <div className={style.nJe_3zq_plf}>
                                <Input type="text" className={style.input} placeholder='برند' name='brand' result={handleResult} />
                                {touch.brand && errors.brand && <span className={style.errors_input}>{errors.brand}</span>}
                            </div>
                            <div className={style.nJe_3zq_plf}>
                                <div>
                                    <DropDown array={categoryArray()} name='category'
                                        Searchable placeHolder='دسته بندی' label Multiple setState={handleSelectCategory} />
                                </div>
                                {touch.category && errors.category && <span className={style.errors_input}>{errors.category}</span>}
                            </div>
                        </div>
                        <div className={style.Fv_tFExqlo}>
                            <UploadImage setProduct={setProduct} imageList={product.imageList} />
                            <div className={style.errors_div_input}>
                                {touch.img && errors.img && <span>{errors.img}</span>}
                                {touch.imageList && errors.imageList && <span>{errors.imageList}</span>}
                            </div>
                        </div>
                        <div className={style.DxwzE_Os_T3}>
                            <Price setProduct={setProduct} off_price={product.off_price} touch={touch} errors={errors} style={style} />
                        </div>
                        <div className={style.ICex11A_4}>
                            <div className={style.kctE_1Zq}>
                                <div className={style.NbGvR}>
                                    <div className={style.jCrxy}>
                                        <Input type='text' placeholder='رنگ' name='color' result={handleResult} />
                                        <Input type='color' name='colorCode' result={handleResult} value='#ffffff' />
                                    </div>
                                    <div className={style.Fcximy}>
                                        {touch.color && errors.color && <span className={style.errors_span_input}>{errors.color}</span>}
                                        {touch.colorCode && errors.colorCode && <span className={style.errors_span_input}>{errors.colorCode}</span>}
                                    </div>
                                </div>
                                <Size setProduct={setProduct} errors={errors} touch={touch} />
                            </div>
                            <div className={style.vExpkqZu}>
                                <SizesList setProduct={setProduct} sizes={product.sizes} />
                            </div>
                        </div>
                        <div className={style.bGCzu_wq}>
                            <Specifications setProduct={setProduct} />
                            <div className={style.jCrxi_22A5}>
                                <SpecificationList data={product.specifications} setProduct={setProduct} />
                                {touch.specifications && errors.specifications && <span className={style.errors_input}>{errors.specifications}</span>}
                            </div>
                        </div>
                        <div className={style.save_pro_qq}>
                            <button className={style.onRc_12ar}>ثبت محصول</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Form;