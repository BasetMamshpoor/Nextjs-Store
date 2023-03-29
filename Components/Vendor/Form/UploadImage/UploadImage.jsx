import React, { useEffect } from 'react';
import style from './UploadImage.module.css'
const UploadImage = ({ setProduct, imageList }) => {

    useEffect(() => {
        window.addEventListener('click', handleRemove)
        return () => window.removeEventListener('click', handleRemove)
    }, [])

    function handleRemove(e) {
        if (e.target.id === 'upload_img') {
            const el = e.target.parentElement
            const file = el.getAttribute('data-file')
            const fileName = el.getAttribute('file-name')
            if (fileName) {
                setProduct(prev => {
                    const { img, ...data } = prev
                    return { ...data }
                })
            }
            for (const i of imageList) {
                if (i.name === file) {
                    setProduct(prev => {
                        prev.imageList.splice(i, 1)
                        return { ...prev }
                    })
                    break;
                }
                else if (i.name === fileName) {
                    setProduct(prev => {
                        prev.imageList.splice(i, 1)
                        return { ...prev }
                    })
                    break;
                }
            }
            el.remove();
        }
    }

    const handleMultipleImage = (e) => {
        const imgArray = [];
        const fileArry = e.target.parentElement.parentElement.parentElement.children[2]
        for (const file of e.target.files) {
            imgArray.push(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener('load', function () {
                let html = `
                <div class=${style.upload__img_box} data-file='${file.name}' >
                    <img src='${this.result}' />
                    <div class=${style.upload__img_close} id='upload_img'></div>
                </div>`;
                fileArry.innerHTML += html
            })
        }
        setProduct(prev => {
            return {
                ...prev,
                imageList: [...prev.imageList, ...imgArray]
            }
        })
    }

    const handleMainImg = (e) => {
        const fileArry = e.target.parentElement.parentElement.parentElement.children[1]
        fileArry.innerHTML = ''
        const file = e.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('load', function () {
            let html = `
                <div class=${style.main_img} file-name='${file.name}'>
                    <img src='${this.result}'/>
                    <div class=${style.upload__img_close} id='upload_img'></div>
                </div>`;
            fileArry.innerHTML += html
        })
        setProduct(prev => {
            prev['img'] = file
            return {
                ...prev,
                imageList: [...prev.imageList, file]
            }
        })
    }
    return (
        <>
            <div className={style.iJIucw}>
                <div className={style.upload__btn_box}>
                    <label className={style.upload__btn} htmlFor="inputFile">
                        <p>انتخاب تصویر اصلی</p>
                        <input onChange={handleMainImg}
                            type="file" name='img' id='inputFile' hidden
                            accept='image/jpeg, image/jpg, image/png, image/webp' />
                    </label>
                    <label className={style.upload__btn} htmlFor="inputFiles">
                        <p>آپلود تصاویر</p>
                        <input onChange={handleMultipleImage}
                            type="file" name="image" id="inputFiles"
                            hidden multiple
                            accept='image/jpeg, image/jpg, image/png, image/webp' />
                    </label>
                </div>
                <div className={style.upload_main_img_wrap}></div>
                <div className={style.upload__img_wrap}></div>
            </div>
        </>
    );
};

export default (UploadImage);