import Address from 'Components/Profile/Address';
import Information from 'Components/Profile/Information';
import Orders from 'Components/Profile/Orders';
import Wishlist from 'Components/Profile/Wishlist';
import UserProf from '/public/Images/Ei-user.svg'
import { useRouter } from 'next/router';
import Link from 'next/link';
import style from './Profile.module.css'
import useRequest from 'hooks/useRequest';
import Comments from 'Components/Profile/Comments';
import { useCallback } from 'react';
import { BsPerson, BsBag, BsHeart, } from 'react-icons/bs';
import { GrLocation } from 'react-icons/gr';
import { FaRegCommentDots } from 'react-icons/fa';
import { IoIosLogOut } from 'react-icons/io';
import { MdOutlineMessage } from 'react-icons/md';


const Profile = () => {
    const router = useRouter();
    const { route } = router.query
    const [info] = useRequest('/profile/information')

    const Components = useCallback((route) => {
        let cmp = [
            { route: 'information', component: <Information />, },
            { route: 'orders', component: <Orders />, },
            { route: 'wishlist', component: <Wishlist />, },
            { route: 'address', component: <Address />, },
            { route: 'comments', component: <Comments />, },
        ]
        return cmp.find(c => c.route === route)?.component
    }, [])

    return (
        <>
            <main>
                <div className="my-5">
                    <div className="container">
                        <div className="GjHeci row">
                            <div className="col-9 pe-3">
                                {Components(route)}
                            </div>
                            <div className="col-3">
                                <div className={style.crveJoY34}>
                                    <div className={style.cEdoly}>
                                        <div className={style.loBycI}>
                                            <p>{info?.data.name}</p>
                                            <span>۳۰۰۰۱۵۳۸۹۲۳۴۱</span>
                                        </div>
                                        <div className={style.vGtcol}>
                                            <img src={UserProf.src} alt="" />
                                        </div>
                                    </div>
                                    <div className={style.cGrxO}>
                                        <ul className={style.hBokr5H}>
                                            <li className={`${style.TvOin5} ${route === 'information' ? style.pSec_active : ''}`}>
                                                <Link href='/profile/information'>
                                                    <div className={style.FEiXo}>
                                                        <BsPerson />
                                                    </div>
                                                    <span className={style.CrxOs}>اطلاعات حساب کاربری</span>
                                                </Link>
                                            </li>
                                            <li className={`${style.TvOin5} ${route === 'orders' ? style.pSec_active : ''}`}>
                                                <Link href="/profile/orders">
                                                    <div className={style.FEiXo}>
                                                        <BsBag />
                                                    </div>
                                                    <span className={style.CrxOs}>سفارش‌ها</span>
                                                </Link>
                                            </li>
                                            <li className={`${style.TvOin5} ${route === 'wishlist' ? style.pSec_active : ''}`}>
                                                <Link href="/profile/wishlist">
                                                    <div className={style.FEiXo}>
                                                        <BsHeart />
                                                    </div>
                                                    <span className={style.CrxOs}>لیست علاقه‌مندی</span>
                                                </Link>
                                            </li>
                                            <li className={`${style.TvOin5} ${route === 'address' ? style.pSec_active : ''}`}>
                                                <Link href="/profile/address">
                                                    <div className={style.FEiXo}>
                                                        <GrLocation />
                                                    </div>
                                                    <span className={style.CrxOs}>آدرس‌ها</span>
                                                </Link>
                                            </li>
                                            <li className={`${style.TvOin5} ${route === 'comments' ? style.pSec_active : ''}`}>
                                                <Link href="/profile/comments">
                                                    <div className={style.FEiXo}>
                                                        <FaRegCommentDots />
                                                    </div>
                                                    <span className={style.CrxOs}>دیدگاه‌ها</span>
                                                </Link>
                                            </li>
                                            <li className={style.TvOin5}>
                                                <a href=' ' onClick={e => e.preventDefault()}>
                                                    <div className={style.FEiXo}>
                                                        <IoIosLogOut />
                                                    </div>
                                                    <span className={style.CrxOs}>خروج</span>
                                                </a>
                                            </li>
                                            <li className={style.TvOin5}>
                                                <a href=' ' onClick={e => e.preventDefault()}>
                                                    <div className={style.FEiXo}>
                                                        <MdOutlineMessage />
                                                    </div>
                                                    <span className={style.CrxOs}>پیغام‌های پشتیبانی</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
export async function getStaticPaths() {

    return {
        paths: [
            { params: { route: 'information' } },
            { params: { route: 'wishlist' } },
            { params: { route: 'address' } },
            { params: { route: 'orders' } },
            { params: { route: 'comments' } },
        ],
        fallback: false
    }
}
export async function getStaticProps() {

    return {
        props: {}
    }
}

export default Profile;
