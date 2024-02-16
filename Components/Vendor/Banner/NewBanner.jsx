import style from './NewBanner.module.css'
import { useRef, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Cookies from 'js-cookie';

const NewBanner = ({ data, setIsOpen, SwalStyled, reload }) => {
    const wrapper = useRef()
    const err = useRef()
    const [banner, setBanner] = useState(!!data ? { link: data.link, src: data.src } : {})
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0)
    const token = JSON.parse(Cookies.get('token'))
    const headers = { 'Content-Type': 'multipart/form-data', Authorization: `${token.token_type} ${token.access_token}` }
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
            setBanner(prev => {
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
        setBanner(prev => {
            return { ...prev, src: file }
        })
        err.current.innerText = ''
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        let obj = typeof banner.src === 'object' ? { ...banner, _method: "PUT", type: "homepage" } : { link: banner.link, _method: "PUT", type: "homepage" }
        await axios.post(`/admin/banners/${data.id}`, obj, {
            headers,
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                setProgress(percentCompleted);
            },
        }).then(() => {
            SwalStyled.fire('.ویرایش شد', '.بنر مورد نظر با موفقیت ویرایش شد', 'success')
            reload(Math.random())
            setIsOpen(false)
        }).catch(() => SwalStyled.fire('.ویرایش نشد', '.بنر مورد نظر با موفقیت ویرایش نشد', 'error'))
        // if (!!data) {
        // }
        // else await axios.post('/admin/banners', banner, { headers })
        //     .then(() => {
        //         SwalStyled.fire('.ثبت شد', '.بنر جدیدی با موفقیت ثبت شد', 'success')
        //         reload(Math.random())
        //         setIsOpen(false)
        //     }).catch(({ response }) => SwalStyled.fire('.ثبت نشد', response.data.message, 'error'))
    }
    return (
        <>
            <div className={style.hVhBe3q}>
                <form className={style.e1Wz0E} onSubmit={handleSubmit}>
                    <div className={style.upload}>
                        <input type="file" hidden id='file' accept='image/jpeg, image/jpg, image/png, image/webp' onChange={(e) => handleUpload(e, 'target')} />
                        <div className={style.drag_drop} onDragOver={e => e.preventDefault()} onDrop={(e) => handleUpload(e, 'dataTransfer')}>
                            <p>.عکس را داخل بیندازید</p>
                            <div className={style.icon}>
                                <Image ref={wrapper} src={!data ? imagePlaceholder : !!data.src ? data.src : imagePlaceholder}
                                    width={100} height={100} placeholder='blur' unoptimized={true} blurDataURL={imagePlaceholder} alt='' />
                            </div>
                            <div className={style.pick}> یا <label htmlFor="file"> انتخاب عکس </label></div>
                        </div>
                    </div>
                    {/* <div className={style.dropdown}>
                        <DropDown array={[]} placeHolder='انتخاب مکان' />
                    </div> */}
                    <label htmlFor="link" className={style.link}>
                        <span>: لینک</span>
                        <input required type="url" id='link' onChange={({ target }) => setBanner(prev => { return { ...prev, link: target.value } })} value={banner.link} />
                    </label>
                    <div className={style.Errors}>
                        <p ref={err}></p>
                    </div>
                    <button className={`${style.submit} ${loading ? style.startSubmit : ''}`}
                        style={loading ? { background: `linear-gradient(to right, #3499ff ${progress}%, #fff 0%)` } : {}}>
                        {loading ? (progress + '%') : !!data ? 'ویرایش' : 'ثبت'}</button>
                </form>
            </div >
        </>
    );
};

export default NewBanner;