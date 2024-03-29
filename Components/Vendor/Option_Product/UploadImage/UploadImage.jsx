import { useEffect } from 'react';
import style from './UploadImage.module.css'
const UploadImage = ({ setProduct, images }) => {

    useEffect(() => {
        window.addEventListener('click', handleRemove)
        return () => window.removeEventListener('click', handleRemove)
    }, [])

    function handleRemove(e) {
        if (e.target.id === 'upload_img') {
            const el = e.target.parentElement
            const file = el.getAttribute('data-file')
            const fileName = el.getAttribute('file-name')
            setProduct(prev => {
                if (fileName) {
                    const { image, ...data } = prev
                    return { ...data }
                } else if (file) {
                    const deletedImage = prev.images.find(i => i.name === file)
                    const clearList = prev.images.filter(i => i !== deletedImage)
                    return { ...prev, images: clearList }
                }
            })
            el.remove();
        }
    }

    const handleMultipleImage = (e) => {
        const imgArray = [];
        const fileArry = e.target.parentElement.parentElement.parentElement.children[3]
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
                images: [...prev.images, ...imgArray]
            }
        })
    }

    const handleMainImg = (e) => {
        const fileArry = e.target.parentElement.parentElement.parentElement.children[2]
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
            return {
                ...prev,
                image: file
            }
        })
    }

    const handleImageOption = (e) => {
        const name = parseInt(e.target.name)
        setProduct(prev => {
            const { deletingImages } = prev
            if (!deletingImages.includes(name)) {
                deletingImages.push(name);
            } else {
                deletingImages.splice(deletingImages.indexOf(name), 1);
            }
            return { ...prev }
        })
    }

    return (
        <>
            <div className={style.iJIucw}>
                <div className={style.form_group}>
                    {!!images && images.length > 0 &&
                        <>
                            <label className={style.control_label}>جهت حذف، روی عکس مورد نظر کلیک کنید.</label>
                            <div className={style.OvrcU}>
                                {images.map(i => {
                                    return (
                                        <div key={i.id} className={style.ExBt_2}>
                                            <input
                                                type="checkbox"
                                                name={i.id}
                                                id={`image${i.id}`}
                                                hidden
                                                onChange={handleImageOption}
                                            />
                                            <label htmlFor={`image${i.id}`} className={style.image_holder}>
                                                <img src={i.src} alt="imagePost" />
                                            </label>
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    }
                </div>
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
                <div className={style.upload__img_wrap}> </div>
            </div>
        </>
    );
};

export default UploadImage;