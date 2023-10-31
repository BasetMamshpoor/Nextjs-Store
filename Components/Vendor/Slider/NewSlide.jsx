import style from './NewSlide.module.css'
import { MdDriveFolderUpload } from "react-icons/md";
import { useRef, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const NewSlide = ({ data, setIsOpen }) => {
    const wrapper = useRef()
    const err = useRef()
    const [slide, setSlide] = useState({})
    // const [link, setLink] = useState()

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
        wrapper.current.innerHTML = ""
        const file = e[t].files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            let html = `<img src='${this.result}'/> `;
            wrapper.current.innerHTML += html
            // setLink(file)
        }
        setSlide(prev => {
            return { ...prev, src: file }
        })
        err.current.innerText = ''
    }
    const handleSubmit = async () => {
        // let img = new Image();
        // img.src = link
        // if (img.width !== 2880 && img.height !== 600) {
        //     err.current.innerText = `لطفا عکس با ابعاد 600*2880 وارد کنید
        //     ابعاد عکس وارد شده ${img.height}*${img.width} است.`
        //     return
        // }
        await axios.post('/admin/sliders', { ...slide }, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(res => setIsOpen(false))
            .catch(err => console.log(err))
    }
    const handleEdit = async () => {
        await axios.put(`/admin/sliders/${data.id}`, { src: data.src, link: slide.link })
            .then(() => setIsOpen(false))
            .catch(err => console.log(err))
    }
    return (
        <>
            <div className={style.hVhBe3q}>
                <div className={style.e1Wz0E}>
                    <div className={style.upload}>
                        <input type="file" hidden id='file' accept='image/jpeg, image/jpg, image/png, image/webp' onChange={(e) => handleUpload(e, 'target')} />
                        <div className={style.drag_drop} onDragOver={e => e.preventDefault()} onDrop={(e) => handleUpload(e, 'dataTransfer')}>
                            <p>.عکس را داخل بیندازید</p>
                            <div className={style.icon} ref={wrapper}>
                                {!!data ? <Image src={data.src} width={100} height={100} placeholder='blur' unoptimized={true} blurDataURL='/Images/placeholder-1.png' alt='' /> : <MdDriveFolderUpload />}
                            </div>
                            <span> یا <label htmlFor="file"> انتخاب عکس </label></span>
                        </div>
                    </div>
                    <label htmlFor="link" className={style.link}>
                        <span>: لینک</span>
                        <input type="text" id='link' onChange={({ target }) => setSlide(prev => { return { ...prev, link: target.value } })} defaultValue={!!data ? data.link : ''} />
                    </label>
                    <div className={style.Errors}>
                        <p ref={err}></p>
                    </div>
                    {!!data ? <button className={style.submit} onClick={handleEdit}>تغییر</button>
                        : <button className={style.submit} onClick={handleSubmit}>ایجاد</button>}
                </div>
            </div>
        </>
    );
};

export default NewSlide;