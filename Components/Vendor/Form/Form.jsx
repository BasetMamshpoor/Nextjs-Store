import { useState } from 'react';
import Input from '../../Input';
import style from './Form.module.css'
import AttributesList from './Attributes/AttributesList'
import axios from 'axios';
import validation from 'Functions/AddProductValidation';
import { useRouter } from 'next/router';
import Size from './Sizes';
import SizesList from './Sizes/SizesList';
import Attributes from './Attributes';
import Price from './Price';
import UploadImage from './UploadImage';
import { ImBoxAdd } from 'react-icons/im'
import SelectCategories from './SelectCategories';
import Brands from './Brands';
import Swal from 'sweetalert2';

const Form = () => {
    const router = useRouter()
    const [product, setProduct] = useState({ category_id: null, sizes: [], attributes: [], images: [] })
    const [touch, setTouch] = useState({})

    const errors = validation(product)

    const handleResult = (name, value) => {
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
            setTouch({ name: true, brand_id: true, category_id: true, image: true, images: true, price: true, offPrice: true, color: true, colorCode: true, sizes: true, attributes: true, discountTime: true })
        } else {
            await axios.post('/admin/products', product, { headers: { 'Content-Type': 'multipart/form-data' } })
                .then(res => {
                    Swal.fire({
                        title: '.ثبت شد',
                        text: ".محصول مورد نظر با موفقیت ثبت شد",
                        icon: 'success'
                    }).then(() => {
                        router.push(`/products/${res.data.data.product.id}`)
                    })
                })
                .catch(err => {
                    Swal.fire(".ثبت نشد", ".مشکلی در فرایند ثبت محصول پیش آمده", "error")
                })
        }

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
                                <Brands touch={touch} errors={errors} setProduct={setProduct} />
                                {touch.brand_id && errors.brand_id && <span className={style.errors_input}>{errors.brand_id}</span>}
                            </div>
                            <SelectCategories touch={touch} errors={errors} setProduct={setProduct} />
                        </div>
                        <div className={style.Fv_tFExqlo}>
                            <UploadImage setProduct={setProduct} images={product.images} />
                            <div className={style.errors_div_input}>
                                {touch.image && errors.image && <span>{errors.image}</span>}
                                {touch.images && errors.images && <span>{errors.images}</span>}
                            </div>
                        </div>
                        <div className={style.DxwzE_Os_T3}>
                            <Price setProduct={setProduct} offPrice={product.offPrice} price={product.price} discountTime={product.discountTime} touch={touch} errors={errors} style={style} />
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
                            <Attributes setProduct={setProduct} />
                            <div className={style.jCrxi_22A5}>
                                <AttributesList data={product.attributes} setProduct={setProduct} />
                                {touch.attributes && errors.attributes && <span className={style.errors_input_specif}>{errors.attributes}</span>}
                            </div>
                        </div>
                        <div className={style.tcuExo0}>
                            <textarea name='description' className={style.textarea} placeholder='توضیحات'></textarea>
                        </div>
                        <div className={style.save_pro_qq}>
                            <button className={style.onRc_12ar} onClick={handleSubmit}>ثبت محصول</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Form;