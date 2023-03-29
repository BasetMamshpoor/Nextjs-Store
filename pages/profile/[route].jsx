import React from 'react';
import Address from 'Components/Profile/Address';
import Information from 'Components/Profile/Information';
import Orders from 'Components/Profile/Orders';
import Wishlist from 'Components/Profile/Wishlist';
import UserProf from '/public/Images/Ei-user.svg'
import { useRouter } from 'next/router';
import Link from 'next/link';
import style from './Profile.module.css'
const Profile = () => {
    const router = useRouter();
    const { route } = router.query


    return (
        <>
            <main>
                <div className="my-5">
                    <div className="container">
                        <div className="GjHeci row">
                            <div className="col-9 pe-5">
                                {route === 'information' ? <Information /> : null}
                                {route === 'orders' ? <Orders /> : null}
                                {route === 'wishlist' ? <Wishlist /> : null}
                                {route === 'address' ? <Address /> : null}
                            </div>
                            <div className="col-3">
                                <div className={style.crveJoY34}>
                                    <div className={style.cEdoly}>
                                        <div className={style.loBycI}>
                                            <p>عبدالباسط ماموشی پور</p>
                                            <span>۳۰۰۰۱۵۳۸۹۲۳۴۱</span>
                                        </div>
                                        <div className={style.vGtcol}>
                                            <img src={UserProf.src} alt="" />
                                        </div>
                                    </div>
                                    <div className={style.cGrxO}>
                                        <ul className={style.hBokr5H}>
                                            <li className={`${style.TvOin5} ${route === 'information' ? style.pSec_active : null}`}>
                                                <Link href='/profile/information'>
                                                    <div className={style.FEiXo}>
                                                        <svg fill="currentColor" viewBox="0 0 16 16">
                                                            <path
                                                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                                                        </svg>
                                                    </div>
                                                    <span className={style.CrxOs}>اطلاعات حساب کاربری</span>
                                                </Link>
                                            </li>
                                            <li className={`${style.TvOin5} ${route === 'orders' ? style.pSec_active : null}`}>
                                                <Link href="/profile/orders">
                                                    <div className={style.FEiXo}>
                                                        <svg fill="currentColor" viewBox="0 0 16 16">
                                                            <path
                                                                d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                                        </svg>
                                                    </div>
                                                    <span className={style.CrxOs}>سفارش‌ها</span>
                                                </Link>
                                            </li>
                                            <li className={`${style.TvOin5} ${route === 'wishlist' ? style.pSec_active : null}`}>
                                                <Link href="/profile/wishlist">
                                                    <div className={style.FEiXo}>
                                                        <svg fill="currentColor" viewBox="0 0 16 16">
                                                            <path
                                                                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                                        </svg>
                                                    </div>
                                                    <span className={style.CrxOs}>لیست علاقه‌مندی</span>
                                                </Link>
                                            </li>
                                            <li className={`${style.TvOin5} ${route === 'address' ? style.pSec_active : null}`}>
                                                <Link href="/profile/address">
                                                    <div className={style.FEiXo}>
                                                        <svg fill="currentColor" viewBox="0 0 16 16">
                                                            <path
                                                                d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                                                            <path
                                                                d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                                        </svg>
                                                    </div>
                                                    <span className={style.CrxOs}>آدرس‌ها</span>
                                                </Link>
                                            </li>
                                            <li className={style.TvOin5}>
                                                <a href=' ' onClick={e => e.preventDefault()}>
                                                    <div className={style.FEiXo}>
                                                        <svg fill="currentColor" viewBox="0 0 16 16">
                                                            <path fillRule="evenodd"
                                                                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                                            <path fillRule="evenodd"
                                                                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                                        </svg>
                                                    </div>
                                                    <span className={style.CrxOs}>خروج</span>
                                                </a>
                                            </li>
                                            <li className={style.TvOin5}>
                                                <a href=' ' onClick={e => e.preventDefault()}>
                                                    <div className={style.FEiXo}>
                                                        <svg fill="currentColor" viewBox="0 0 16 16">
                                                            <path
                                                                d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z" />
                                                            <path
                                                                d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                                                        </svg>
                                                    </div>
                                                    <span className={style.CrxOs}>پیغام‌های پشتیبانی</span>
                                                </a>
                                            </li>
                                            <li className={style.TvOin5}>
                                                <a href=" " onClick={e => e.preventDefault()}>
                                                    <div className={style.FEiXo}>
                                                        <svg fill="currentColor" viewBox="0 0 16 16">
                                                            <path
                                                                d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
                                                            <path
                                                                d="M7.066 6.76A1.665 1.665 0 0 0 4 7.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 0 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 7.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 0 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z" />
                                                        </svg>
                                                    </div>
                                                    <span className={style.CrxOs}>دیدگاه‌ها</span>
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
