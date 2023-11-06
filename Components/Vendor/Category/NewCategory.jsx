import Input from 'Components/Input';
import style from './NewCategory.module.css'
import { BiCategoryAlt } from 'react-icons/bi'
import Image from 'next/image';
import { FiCheckCircle, FiEdit3, FiTrash2 } from 'react-icons/fi';
import { useState } from 'react';

const NewCategory = ({ state, categoryLevel }) => {
    const [category, setCategory] = useState()

    const handleChange = (name, value) => {
        setCategory(prev => {
            return { ...prev, [name]: value }
        })
    }

    return (
        <>
            <div className={style.modal}>
                <div className={style.content}>
                    <form className={style.form}>
                        <div className={style.title}><span><BiCategoryAlt /></span><h3>فرم {!!state ? 'ویرایش' : 'افزودن'} دسته بندی</h3></div>
                        <div className={style.fields}>
                            <div className={style.inputs}>
                                <div className={style.inputField}>
                                    <input readOnly={true} className={style.readonly} value={category} dir='auto' placeholder='' id='input_1' />
                                    <label className={style.inputLabel} htmlFor="input_1">نام دسته والد</label>
                                </div>
                                <div className={style.inputField}>
                                    <input readOnly value={category} className={style.readonly} dir='auto' placeholder='' id='input_2' />
                                    <label className={style.inputLabel} htmlFor="input_2">اسلاگ دسته والد</label>
                                </div>
                                <div className={style.inputField}>
                                    <Input value={category} result={handleChange} name='' dir='auto' placeholder='' id='input_3' type="text" />
                                    <label className={style.inputLabel} htmlFor="input_3">نام دسته جدید</label>
                                </div>
                                <div className={style.inputField}>
                                    <Input value={category} result={handleChange} name='' dir='auto' placeholder='' id='input_4' type="text" />
                                    <label className={style.inputLabel} htmlFor="input_4">اسلاگ دسته جدید</label>
                                </div>
                            </div>
                            <div className={style.media}>
                                <input type="file" name="icon" id="iconInput" hidden />
                                <label className={style.inputImage} htmlFor="iconInput">انتخاب عکس جدید</label>
                                <div className={style.wrapper}>
                                    <Image src={'/Images/apparel/man clothing/121228579.jpg'} placeholder='blur' blurDataURL='/Images/placeholder-1.png' unoptimized={true} alt={'i.name'} width={100} height={100} />
                                </div>
                            </div>
                            <div className={style.buttons}>
                                <button className={style.btnSubmit}>{!!state ? 'ویرایش' : 'ثبت'}
                                    <span>{!!state ? <FiEdit3 /> : <FiCheckCircle />}</span>
                                </button>
                                {!!state && <button className={style.btnDelete}>حذف <span><FiTrash2 /></span></button>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default NewCategory;