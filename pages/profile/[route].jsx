import UserProf from '/public/Images/Ei-user.svg'
import { useRouter } from 'next/router';
import style from './Profile.module.css'
import useRequest from 'hooks/useRequest';
import profileRoutes from './routes';
import Component from 'Components/Sidebar_Component';


const Profile = () => {
    const router = useRouter();
    const { route } = router.query
    const [info] = useRequest('/profile/information')

    return (
        <>
            <main>
                <div className="my-5" dir='rtl'>
                    <div className="container">
                        <Component page='profile' links={profileRoutes} query={route}>
                            <div className={style.cEdoly}>
                                <div className={style.vGtcol}>
                                    <img src={UserProf.src} alt="" />
                                </div>
                                <div className={style.loBycI}>
                                    <p>{info?.name}</p>
                                    <span>۳۰۰۰۱۵۳۸۹۲۳۴۱</span>
                                </div>
                            </div>
                        </Component>
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
