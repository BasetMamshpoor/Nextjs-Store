import style from './Information.module.css'
import { FiEdit } from 'react-icons/fi'
import useGetRequest from 'hooks/useGetRequest';
import axios from 'axios';
const Information = () => {
    const [info] = useGetRequest('/profile/information')

    const handlePassword = async () => {
        const token = {}
        await axios.post('/user/set-password', { password: '12345678', password_confirmation: '12345678' }, {
            headers: { Authorization: `${token.token_type} ${token.access_token}` }
        }).then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className={style.UBtgvIR4}>
                <div className={style.lOmph0}>
                    <div className={style.kLRx8Fh}>
                        <div className={style.nbGr5K}>
                            <FiEdit />
                        </div>
                        <div className={style.GvrclT4}>
                            <div className={style.Rcinpte}>
                                <p>نام و نام خانوادگی</p>
                            </div>
                            <p className={style.RcnlEx}>{info?.name}</p>
                        </div>
                    </div>
                    <div className={style.kLRx8Fh}>
                        <div className={style.nbGr5K}>
                            <FiEdit />
                        </div>
                        <div className={style.GvrclT4}>
                            <div className={style.Rcinpte}>
                                <p>کد ملی</p>
                            </div>
                            <p className={style.RcnlEx}>123456789</p>
                        </div>
                    </div>
                    <div className={style.kLRx8Fh}>
                        <div className={style.nbGr5K}>
                            <FiEdit />
                        </div>
                        <div className={style.GvrclT4}>
                            <div className={style.Rcinpte}>
                                <p>شماره موبایل</p>
                            </div>
                            <p className={style.RcnlEx}>۳۰۰۰۱۵۳۸۹۲۳۴۱</p>
                        </div>
                    </div>
                    <div className={style.kLRx8Fh}>
                        <div className={style.nbGr5K}>
                            <FiEdit />
                        </div>
                        <div className={style.GvrclT4}>
                            <div className={style.Rcinpte}>
                                <p>ایمیل</p>
                            </div>
                            <p className={style.RcnlEx}>{info?.email}</p>
                        </div>
                    </div>
                    <div className={style.kLRx8Fh}>
                        <div className={style.nbGr5K} onClick={handlePassword}>
                            <FiEdit />
                        </div>
                        <div className={style.GvrclT4}>
                            <div className={style.Rcinpte}>
                                <p>رمز عبور</p>
                            </div>
                            <p className={style.RcnlEx}>•••••••</p>
                        </div>
                    </div>
                    <div className={style.kLRx8Fh}>
                        <div className={style.nbGr5K}>
                            <FiEdit />
                        </div>
                        <div className={style.GvrclT4}>
                            <div className={style.Rcinpte}>
                                <p>تاریخ تولد</p>
                            </div>
                            <p className={style.RcnlEx}>۱۳۸۱/۱۲/۲۶</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Information;