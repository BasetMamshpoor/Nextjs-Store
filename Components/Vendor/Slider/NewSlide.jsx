import style from './NewSlide.module.css'
import { useRef, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { FiTrash2 } from 'react-icons/fi';

const NewSlide = ({ data, setIsOpen, SwalStyled, reload }) => {
    const wrapper = useRef()
    const err = useRef()
    const [slide, setSlide] = useState(!!data ? { link: data.link, src: data.src } : {})
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0)

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
            setSlide(prev => {
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
        setLoading(true)
        if (!!data) {
            let obj = typeof slide.src === 'object' ? { ...slide, _method: "PUT" } : { link: slide.link, _method: "PUT" }
            await axios.post(`/admin/sliders/${data.id}`, obj, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setProgress(percentCompleted);
                },
            })
                .then(() => {
                    SwalStyled.fire('.ویرایش شد', '.اسلاید مورد نظر با موفقیت ویرایش شد', 'success')
                    reload(Math.random())
                    setIsOpen(false)
                }).catch(() => SwalStyled.fire('.ویرایش نشد', '.اسلاید مورد نظر با موفقیت ویرایش نشد', 'error'))
        }
        else await axios.post('/admin/sliders', slide, {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                setProgress(percentCompleted);
            },
        })
            .then(() => {
                SwalStyled.fire('.ثبت شد', '.اسلاید جدیدی با موفقیت ثبت شد', 'success')
                reload(Math.random())
                setIsOpen(false)
            }).catch(({ response }) => SwalStyled.fire('.ثبت نشد', response.data.message, 'error'))
    }
    const handleDelete = () => {
        SwalStyled.fire({
            title: "آیا مطمئن هستید؟",
            text: "!شما نمی توانید این اسلاید را برگردانید",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "بله حذف شود"
        }).then((result) => {
            if (result.isConfirmed) axios.delete(`/admin/sliders/${data.id}`)
                .then(res => {
                    setData(prev => {
                        const Prev = prev.filter(s => s.id !== data.id)
                        return Prev
                    })
                    SwalStyled.fire("!حذف شد", ".اسلاید مورد نظر با موفقیت حذف شد", "success");
                }).catch(err => SwalStyled.fire("!حذف نشد", ".اسلاید مورد نظر با موفقیت حذف نشد", "error"))
        });
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
                                <Image ref={wrapper} src={!data ? imagePlaceholder : !!data.src ? data.src : imagePlaceholder}
                                    width={100} height={100} placeholder='blur' unoptimized={true} blurDataURL={imagePlaceholder} alt='' />
                            </div>
                            <div className={style.pick}> یا <label htmlFor="file"> انتخاب عکس </label></div>
                        </div>
                    </div>
                    <label htmlFor="link" className={style.link}>
                        <span>: لینک</span>
                        <input required type="url" id='link' onChange={({ target }) => setSlide(prev => { return { ...prev, link: target.value } })} value={slide.link} />
                    </label>
                    <div className={style.Errors}>
                        <p ref={err}></p>
                    </div>
                    <div className={style.buttons}>
                        <button type='button' className={style.btnDelete} onClick={handleDelete}>حذف <span><FiTrash2 /></span></button>
                        <button className={`${style.submit} ${loading ? style.startSubmit : ''}`}
                            style={loading ? { background: `linear-gradient(to right, #3499ff ${progress}%, #fff 0%)` } : {}}>
                            {loading ? (progress + '%') : !!data ? 'ویرایش' : 'ثبت'}</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default NewSlide;