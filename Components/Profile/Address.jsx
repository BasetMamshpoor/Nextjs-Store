import React from 'react';
import style from './Address.module.css'
import { IoLocationSharp } from 'react-icons/io5'
import { FiEdit3 } from 'react-icons/fi'
import { BsTrash, BsPerson, BsTelephone } from 'react-icons/bs'
import { GoMail } from 'react-icons/go'
const Address = () => {
    return (
        <>
            <div className={style.YxaZev_5q} dir="rtl">
                <div className={style.iG_8Lo}>
                    <div className={style.ExolP_3}>
                        <div className={style.KnbYc__9}>
                            <div className={style.KnbYc__10}>
                                <IoLocationSharp />
                            </div>
                            <h5>آدرس ها</h5>
                        </div>
                        <button className={style.OTxe3_M}>ثبت آدرس جدید</button>
                    </div>
                    <div className={style.Ubx7_O3}>
                        <div className={style.oInGt07_}>
                            <div className={style.olCqz8_PP}>
                                <p className={style.ObcjZo_e3}>محل کار</p>
                                <div className={style.cPx_iiRxQ67}>
                                    <div>
                                        <FiEdit3 />
                                    </div>
                                    <div>
                                        <BsTrash />
                                    </div>
                                </div>
                            </div>
                            <div className={style.VxpQl5H_0}>
                                <div className={style.NbvWzpo}>
                                    <label>آدرس : </label>
                                    <p className={style.loMnw}>استان فلان - شهر فلان - منطقه فلان - خیابان
                                        فلان - کوچه فلان - پلاک فلان </p>
                                </div>
                                <div className={style.LGtcmnD_3}>
                                    <label>مشخصات گیرنده </label>
                                    <div className={style.FazWlNmh_i}>
                                        <div className={style.IbCh_1QzTM}>
                                            <div>
                                                <BsPerson />
                                            </div> عبدالباسط ماموشی پور
                                        </div>
                                        <div className={style.IbCh_1QzTM}>
                                            <div>
                                                <BsTelephone />
                                            </div> ۳۰۰۰۱۵۳۸۹۲۳۴۱
                                        </div>
                                        <div className={style.IbCh_1QzTM}>
                                            <div>
                                                <GoMail />
                                            </div> ۱۵۳۸۹۲۳۴۱
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.oInGt07_}>
                            <div className={style.olCqz8_PP}>
                                <p className={style.ObcjZo_e3}>محل کار</p>
                                <div className={style.cPx_iiRxQ67}>
                                    <div>
                                        <FiEdit3 />
                                    </div>
                                    <div>
                                        <BsTrash />
                                    </div>
                                </div>
                            </div>
                            <div className={style.VxpQl5H_0}>
                                <div className={style.NbvWzpo}>
                                    <label>آدرس : </label>
                                    <p className={style.loMnw}>استان فلان - شهر فلان - منطقه فلان - خیابان
                                        فلان - کوچه فلان - پلاک فلان </p>
                                </div>
                                <div className={style.LGtcmnD_3}>
                                    <label>مشخصات گیرنده </label>
                                    <div className={style.FazWlNmh_i}>
                                        <div className={style.IbCh_1QzTM}>
                                            <div>
                                                <BsPerson />
                                            </div> عبدالباسط ماموشی پور
                                        </div>
                                        <div className={style.IbCh_1QzTM}>
                                            <div>
                                                <BsTelephone />
                                            </div> ۳۰۰۰۱۵۳۸۹۲۳۴۱
                                        </div>
                                        <div className={style.IbCh_1QzTM}>
                                            <div>
                                                <GoMail />
                                            </div> ۱۵۳۸۹۲۳۴۱
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={style.oInGt07_}>
                            <div className={style.olCqz8_PP}>
                                <p className={style.ObcjZo_e3}>محل کار</p>
                                <div className={style.cPx_iiRxQ67}>
                                    <div>
                                        <FiEdit3 />
                                    </div>
                                    <div>
                                        <BsTrash />
                                    </div>
                                </div>
                            </div>
                            <div className={style.VxpQl5H_0}>
                                <div className={style.NbvWzpo}>
                                    <label>آدرس : </label>
                                    <p className={style.loMnw}>استان فلان - شهر فلان - منطقه فلان - خیابان
                                        فلان - کوچه فلان - پلاک فلان </p>
                                </div>
                                <div className={style.LGtcmnD_3}>
                                    <label>مشخصات گیرنده </label>
                                    <div className={style.FazWlNmh_i}>
                                        <div className={style.IbCh_1QzTM}>
                                            <div>
                                                <BsPerson />
                                            </div> عبدالباسط ماموشی پور
                                        </div>
                                        <div className={style.IbCh_1QzTM}>
                                            <div>
                                                <BsTelephone />
                                            </div> ۳۰۰۰۱۵۳۸۹۲۳۴۱
                                        </div>
                                        <div className={style.IbCh_1QzTM}>
                                            <div>
                                                <GoMail />
                                            </div> ۱۵۳۸۹۲۳۴۱
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Address;