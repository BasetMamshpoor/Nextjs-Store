import Input from 'Components/Input';
import style from './NewCategory.module.css'
import { BiCategoryAlt } from 'react-icons/bi'
import Image from 'next/image';
import { FiCheckCircle, FiEdit3, FiTrash2 } from 'react-icons/fi';
import { useRef, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const NewCategory = ({ state, categoryLevel, reload, level, setIsOpen, SwalStyled }) => {
    const [category, setCategory] = useState(!!state ? { ...state, parent_id: state.parent.id } : { parent_id: categoryLevel.id })
    const wrapper = useRef()
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0)
    const token = JSON.parse(Cookies.get('token'))
    const headers = { 'Content-Type': 'multipart/form-data', Authorization: `${token.token_type} ${token.access_token}` }
    const imagePlaceholder = '/Images/placeholder-1.png'
    
    const handleChange = (name, value) => {
        setCategory(prev => {
            return { ...prev, [name]: value }
        })
    }

    const handleDelete = () => {
        SwalStyled.fire({
            title: "از حذف دسته اطمینان دارید؟",
            text: 'با حذف دسته محصولات به دسته والد انتقال میابد',
            showDenyButton: true,
            confirmButtonText: "حذف",
            denyButtonText: `لغو`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`/admin/categories/${state.id}`,{headers})
                    .then(() => {
                        SwalStyled.fire({ title: '.حذف شد', text: '.دسته مورد نظر با موفقیت حذف شد', icon: 'success' })
                        setIsOpen(false)
                        reload(Math.random())
                    }).catch(() => {
                        SwalStyled.fire('.حذف نشد', '.دسته مورد نظر با موفقیت حذف نشد', 'error')
                    })
            } else if (result.isDenied) {
                SwalStyled.fire("حذف لغو شد.", "", "info");
            }
        });
    }

    const handleMainImg = (e) => {
        let file;
        if (!!e.target.files[0]) file = e.target.files[0]
        else {
            file = null
            wrapper.current.src = imagePlaceholder
            setCategory(prev => {
                return { ...prev, icon: file }
            })
            return
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', function () {
            wrapper.current.src = this.result
        })
        setCategory(prev => {
            return { ...prev, icon: file }
        })
    }

    const handleSubmit = async () => {
        setLoading(true)
        if (!!state) {
            const { icon, ...data } = category
            let obj = typeof category.icon === 'object' ? { ...category, _method: "PUT" } : { ...data, _method: "PUT" }
            await axios.post(`/admin/categories/${state.id}`, obj, {
                headers,
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setProgress(percentCompleted);
                },
            })
                .then(() => {
                    SwalStyled.fire('.ویرایش شد', '', 'success')
                    setIsOpen(false)
                    reload(Math.random())
                }).catch(() => {
                    SwalStyled.fire('.ویرایش نشد', '', 'error')
                })
        }
        else await axios.post(`/admin/categories`, category, {
            headers,
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                setProgress(percentCompleted);
            },
        })
            .then(() => {
                SwalStyled.fire('.ثبت شد', '', 'success')
                setIsOpen(false)
                reload(Math.random())
            }).catch(() => {
                SwalStyled.fire('.ثبت نشد', '', 'error')
            })
    }
    return (
        <>
            <div className={style.modal}>
                <form className={style.form}>
                    <div className={style.title}><span><BiCategoryAlt /></span><h3>فرم {!!state ? 'ویرایش' : 'افزودن'} دسته بندی</h3></div>
                    <div className={style.fields}>
                        <div className={style.inputs}>
                            <div className={style.inputField}>
                                <Input value={category.name} result={handleChange} name='name' dir='auto' placeholder='' id='input_3' required />
                                <label className={style.inputLabel} htmlFor="input_3">نام دسته</label>
                            </div>
                            <div className={style.inputField}>
                                <Input value={category.slug} result={handleChange} name='slug' dir='auto' placeholder='' id='input_4' required />
                                <label className={style.inputLabel} htmlFor="input_4">اسلاگ دسته</label>
                            </div>
                        </div>
                        <div className={style.media}>
                            <input type="file" name="icon" id="iconInput" onChange={handleMainImg} hidden accept='image/jpeg, image/jpg, image/png, image/webp' />
                            <label className={style.inputImage} htmlFor="iconInput">انتخاب عکس جدید</label>
                            <div className={style.wrapper}>
                                <Image ref={wrapper} src={!state ? imagePlaceholder : !!state.icon ? state.icon : imagePlaceholder} unoptimized={true} alt={'i.name'} width={100} height={100} />
                            </div>
                        </div>
                        <div className={style.buttons}>
                            <button type='button' className={`${style.btnSubmit} ${loading ? style.startSubmit : ''}`} onClick={handleSubmit}
                                style={loading ? { background: `linear-gradient(to right, #3499ff ${progress}%, #fff 0%)` } : {}}>
                                {loading ? (progress + '%') : !!state ? 'ویرایش' : 'ثبت'}
                                <span>{!!state ? <FiEdit3 /> : <FiCheckCircle />}</span>
                            </button>
                            {!!state && level !== 1 && <button type='button' className={style.btnDelete} onClick={handleDelete}>حذف <span><FiTrash2 /></span></button>}
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default NewCategory;