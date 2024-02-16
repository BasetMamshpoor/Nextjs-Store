import { useEffect, useState } from 'react';
import Input from '../../Input';
import style from './Form.module.css'
import AttributesList from './Attributes/AttributesList'
import axios from 'axios';
import validation from 'Functions/AddProductValidation';
import Size from './Sizes';
import SizesList from './Sizes/SizesList';
import Attributes from './Attributes';
import Price from './Price';
import UploadImage from './UploadImage';
import { ImBoxAdd, ImCheckmark } from 'react-icons/im'
import SelectCategories from './SelectCategories';
import Brands from './Brands';
import PrevSizes from './Sizes/PervSizes'
import Cookies from 'js-cookie';

const Form = ({ state, title, push, setIsOpen, reload, SwalStyled }) => {
    const [product, setProduct] = useState({ category_id: null, sizes: [], attributes: [], images: [] })
    const [touch, setTouch] = useState({})
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0)
    const errors = validation(product)
    const token = Cookies.get('token')

    useEffect(() => {
        if (!!state) {
            const { product } = state
            const cleanState = (product.price === product.offPrice) ? filterState(product) : product;
            const { brand, category, image, images, created_at, id, offPercent, rate, slug, sizes, ...prev } = cleanState
            let newProductSatet = { ...prev, brand_id: brand.id, category_id: category.id, images: [], deletingImages: [], deletingSizes: [], sizes: [], _method: "PUT" };
            setProduct(newProductSatet)
        }
    }, [state])

    const filterState = (state) => {
        const { offPrice, off_date_from, off_date_to, ...other } = state
        return other
    }
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
            setLoading(true)
            const headers = { 'Content-Type': 'multipart/form-data', Authorization: `${token.token_type} ${token.access_token}` }
            if (!!state) {
                await axios.post(`/admin/products/${state.product.id}`, product, {
                    headers,
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setProgress(percentCompleted);
                    },
                })
                    .then(res => {
                        SwalStyled.fire({
                            title: '.ویرایش شد',
                            text: ".محصول مورد نظر با موفقیت ویرایش شد",
                            icon: 'success'
                        }).then(() => {
                            reload(Math.random())
                            setIsOpen(false)
                        })
                    })
                    .catch(err => {
                        SwalStyled.fire(".ویرایش نشد", ".مشکلی در فرایند ویرایش محصول پیش آمده", "error")
                    })
            } else {
                await axios.post('/admin/products', product, {
                    headers,
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setProgress(percentCompleted);
                    },
                })
                    .then(res => {
                        SwalStyled.fire({
                            title: '.ثبت شد',
                            text: ".محصول مورد نظر با موفقیت ثبت شد",
                            icon: 'success'
                        }).then(() => {
                            push(`/products/${res.data.data.product.id}`)
                        })
                    })
                    .catch(err => {
                        SwalStyled.fire(".ثبت نشد", ".مشکلی در فرایند ثبت محصول پیش آمده", "error")
                    })
            }
        }
    }
    const getProgress = () => {
        if (progress >= 100) {
            return {
                top: { clip: `rect(25px, 200px, 50px, 0px)`, borderColor: '#4BB543' },
                bottom: { clip: `rect(25px, 200px, 50px, 0px)`, borderColor: '#4BB543' }
            }
        } else if (progress > 50) {
            const percentAbove50 = progress - 50;
            return {
                top: { clip: `rect(0px,${(percentAbove50 * 4)}px, 50px,0px)` },
                bottom: { clip: `rect(25px, 200px, 50px, 0px)` }
            }
        } else if (progress <= 50) {
            return {
                bottom: { clip: `rect(25px, ${(progress * 4)}px, 50px, 0px)` },
            }
        }
    }
    return (
        <>
            <div className={`${style.Kce_1W2M4_6} ${!!state ? style.editing : ''}`} dir='rtl'>
                <div className={style.Hs_i8p4_gV}>
                    <div>
                        <ImBoxAdd />
                    </div>
                    <h6 className={style.qzE3_pNis__4}>{title}</h6>
                </div>
                <div className={style.uTyc_3Waxd1}>
                    <form className={style.WzlProductAdd_tce} method="post" onSubmit={handleSubmit}>
                        <div className={style.DxwzE_Os_T3}>
                            <div className={style.nJe_3zq_plf}>
                                <Input type='text' placeholder="نام محصول" name='name' value={product.name} result={handleResult} className={style.input} />
                                {touch.name && errors.name && <span className={style.errors_input}>{errors.name}</span>}
                            </div>
                            <div className={style.nJe_3zq_plf}>
                                <Brands touch={touch} errors={errors} setProduct={setProduct} id={state?.product.brand.id} />
                                {touch.brand_id && errors.brand_id && <span className={style.errors_input}>{errors.brand_id}</span>}
                            </div>
                            <SelectCategories touch={touch} errors={errors} setProduct={setProduct} data={state?.breadcrumb} />
                        </div>
                        <div className={style.Fv_tFExqlo}>
                            <UploadImage setProduct={setProduct} images={state?.product.images} image={state?.product.image} />
                            <div className={style.errors_div_input}>
                                {touch.image && errors.image && <span>{errors.image}</span>}
                                {touch.images && errors.images && <span>{errors.images}</span>}
                            </div>
                        </div>
                        <div className={style.DxwzE_Os_T3}>
                            <Price setProduct={setProduct} offPrice={product.offPrice} price={product.price} touch={touch} errors={errors} discountTime={{ off_date_from: new Date(product.off_date_from), off_date_to: new Date(product.off_date_to) }} />
                        </div>
                        <div className={style.ICex11A_4}>
                            <div className={style.kctE_1Zq}>
                                <div className={style.NbGvR}>
                                    <div className={style.jCrxy}>
                                        <Input type='text' placeholder='رنگ' name='color' result={handleResult} value={product.color} />
                                        <Input type='color' name='colorCode' result={handleResult} value={product.colorCode} />
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
                            {!!state && <div className={style.sizes}>
                                <PrevSizes setProduct={setProduct} sizes={state.product.sizes} />
                            </div>}
                        </div>
                        <div className={style.bGCzu_wq}>
                            <Attributes setProduct={setProduct} />
                            <div className={style.jCrxi_22A5}>
                                <AttributesList data={product.attributes} setProduct={setProduct} />
                                {touch.attributes && errors.attributes && <span className={style.errors_input_specif}>{errors.attributes}</span>}
                            </div>
                        </div>
                        <div className={style.save_pro_qq}>
                            <button className={`${style.onRc_12ar} ${loading ? style.activeProgress : ''} ${progress === 100 ? style.Uploaded : ''}`}
                                onClick={handleSubmit}>
                                {progress === 100 ? <ImCheckmark color='#4BB543' /> : loading ? 'آپلــــــود تصــاویــر...' : !!state ? 'ویرایش محصول' : 'ثبت محصول'}
                                {loading ? <>
                                    <span className={style.progress_top} style={getProgress().top} />
                                    <span className={style.progress_bottom} style={getProgress().bottom} />
                                </> : ''}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Form;