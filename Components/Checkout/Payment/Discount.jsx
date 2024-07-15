import style from './Discount.module.css';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from 'react';

const Discount = () => {
    const [showhide, setShowhide] = useState(false)

    return (
        <>
            <div className={style.discount}>
                <div className={style.header}>
                    <div className={style.head}>
                        <p>
                            <span className={style.title}>کد تخفیف</span>
                        </p>
                        <span className={style.close} onClick={() => setShowhide(!showhide)}>
                            {showhide ? "بستن" : "واردکردن کد تخفیف"}
                            <div className={style.icon}>
                                {showhide ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                            </div>
                        </span>
                    </div>
                </div>
                <span className={style.info}>می‌توانید در صورت امکان از کدهای ذخیره‌شده انتخاب کنید، یا خودتان یک کد وارد کنید.</span>
                {showhide && 
                    <div className={style.form}>
                        {/* <label className={style.label}>
                            <div className={style.frame}>
                                <div className={style.input}>
                                    <input type="text" placeholder="اینجا بنویسید" autocomplete="off" />
                                </div>
                                <button className={style.submit}>
                                    <div className={style.submit_text}>ثبت</div>
                                </button>
                                <div className={style.loader}><AiOutlineLoading3Quarters /></div>
                            </div>
                        </label> */}
                        به زودی
                    </div>
                }
            </div>
        </>
    );
};

export default Discount;