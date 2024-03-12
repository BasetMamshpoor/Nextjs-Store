import { useContext, useState } from 'react';
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
import { useRouter } from 'next/router';
import { Functions } from 'providers/FunctionsProvider';
import { Authorization } from 'providers/AuthorizationProvider';

const Form = () => {
    const { push } = useRouter()

    const [product, setProduct] = useState({ category_id: null, sizes: [], attributes: [], images: [] })

    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0)

    const [touch, setTouch] = useState({})
    const errors = validation(product)

    const { SwalStyled } = useContext(Functions)
    const { tokens } = useContext(Authorization)

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
            const headers = { 'Content-Type': 'multipart/form-data', Authorization: `${tokens.token_type} ${tokens.access_token}` }
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
                    setLoading(false)
                    setProgress(0)
                })
                .catch(err => {
                    SwalStyled.fire(".ثبت نشد", ".مشکلی در فرایند ثبت محصول پیش آمده", "error")
                    setLoading(false)
                    setProgress(0)
                })
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
            <div className={style.Kce_1W2M4_} dir='rtl'>
                <div className={style.navBar_}>
                    <div className={style.Hs_i8p4_gV}>
                        <div>
                            <ImBoxAdd />
                        </div>
                        <h6 className={style.qzE3_pNis__4}>افزودن محصول جدید</h6>
                    </div>
                </div>
                <div className={style.uTyc_3Waxd1}>
                    <form className={style.WzlProductAdd_tce} method="post" onSubmit={handleSubmit}>
                        <div className={style.DxwzE_Os_T3}>
                            <div className={style.nJe_3zq_plf}>
                                <Input type='text' placeholder="نام محصول" name='name' value={product.name} result={handleResult} className={style.input} />
                                {touch.name && errors.name && <span className={style.errors_input}>{errors.name}</span>}
                            </div>
                            <div className={style.nJe_3zq_plf}>
                                <Brands touch={touch} errors={errors} setProduct={setProduct} />
                                {touch.brand_id && errors.brand_id && <span className={style.errors_input}>{errors.brand_id}</span>}
                            </div>
                            <SelectCategories touch={touch} errors={errors} setProduct={setProduct} />
                        </div>
                        <div className={style.Fv_tFExqlo}>
                            <UploadImage setProduct={setProduct} />
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
                                {progress === 100 ? <ImCheckmark color='#4BB543' /> : loading ? 'آپلــــــود محصــول...' : 'ثبت محصول'}
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