import style from './New.module.css'
import { useRef, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const New = ({ data, setIsOpen, SwalStyled, reload }) => {
    const wrapper = useRef()
    const err = useRef()
    const [slide, setSlide] = useState(!!data ? { link: data.link, src: data.src } : {})
    const imagePlaceholder = '/Images/placeholder-1.png'

    const handleUpload = (e, t) => {
        if (!e[t].files.length) return
        e.preventDefault();
        const name = e[t].files[0].name
        const allowed_format = ['jpg', 'jpeg', 'png', 'webp']
        let allow = name.substring(name.lastIndexOf('.') + 1, name.length)
        const array = allowed_format.find(a => (allow) === a)
        if (!array) {
            err.current.innerText = `قابل قبول نیست ${allow}`
            return
        }
        let file;
        if (!!e[t].files[0]) file = e[t].files[0]
        else {
            file = null
            wrapper.current.src = imagePlaceholder
            setCategory(prev => {
                return { ...prev, src: file }
            })
            err.current.innerText = '!فایلی پیدا نشد'
            return
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            wrapper.current.src = this.result
        }
        setSlide(prev => {
            return { ...prev, src: file }
        })
        err.current.innerText = ''
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!!data) {
            let obj = typeof slide.src === 'object' ? { ...slide, _method: "PUT" } : { link: slide.link, _method: "PUT" }
            await axios.post(`/admin/sliders/${data.id}`, obj, { headers: { 'Content-Type': 'multipart/form-data' } })
                .then(() => {
                    SwalStyled.fire('.ویرایش شد', '.اسلاید مورد نظر با موفقیت ویرایش شد', 'success')
                    reload(Math.random())
                    setIsOpen(false)
                }).catch(() => SwalStyled.fire('.ویرایش نشد', '.اسلاید مورد نظر با موفقیت ویرایش نشد', 'error'))
        }
        else await axios.post('/admin/sliders', slide, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(() => {
                SwalStyled.fire('.ثبت شد', '.اسلاید جدیدی با موفقیت ثبت شد', 'success')
                reload(Math.random())
                setIsOpen(false)
            }).catch(({ response }) => SwalStyled.fire('.ثبت نشد', response.data.message, 'error'))
    }
    return (
        <>
            <div className={style.hVhBe3q}>
                <form className={style.e1Wz0E} onSubmit={handleSubmit}>
                    <div className={style.upload}>
                        <input type="file" hidden id='file' accept='image/jpeg, image/jpg, image/png, image/webp' onChange={(e) => handleUpload(e, 'target')} />
                        <div className={style.drag_drop} onDragOver={e => e.preventDefault()} onDrop={(e) => handleUpload(e, 'dataTransfer')}>
                            <p>.عکس را داخل بیندازید</p>
                            <div className={style.icon} >
                                <Image ref={wrapper} src={!data ? imagePlaceholder : !!data.src ? data.src : imagePlaceholder} width={100} height={100} placeholder='blur' unoptimized={true} blurDataURL={imagePlaceholder} alt='' />
                            </div>
                            <span> یا <label htmlFor="file"> انتخاب عکس </label></span>
                        </div>
                    </div>
                    <label htmlFor="link" className={style.link}>
                        <span>: لینک</span>
                        <input required type="url" id='link' onChange={({ target }) => setSlide(prev => { return { ...prev, link: target.value } })} value={slide.link} />
                    </label>
                    <div className={style.Errors}>
                        <p ref={err}></p>
                    </div>
                    <button className={style.submit}>{!!data ? 'ویرایش' : 'ثبت'}</button>
                </form>
            </div>
        </>
    );
};

export default New;