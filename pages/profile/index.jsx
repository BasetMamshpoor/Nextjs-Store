import Component from 'Components/Sidebar_Component/Component';
import { useRouter } from 'next/router';
import { Authorization } from 'providers/AuthorizationProvider';
import React, { useContext, useEffect } from 'react';
import profileRoutes from './routes';
import style from './Profile.module.css'
import UserProf from '/public/Images/Ei-user.svg'

const profile = () => {
    const router = useRouter();
    const { route } = router.query
    const { tokens, user } = useContext(Authorization)

    useEffect(() => {
        if (!tokens && !Object.keys(user).length)
            router.push('/auth/login')
    }, [])

    return (
        <>
            {!!tokens ? <main>
                <div className="my-5" dir='rtl'>
                    <div className="container">
                        <Component page='profile' links={profileRoutes} query={route}>
                            <div className={style.cEdoly}>
                                <div className={style.vGtcol}>
                                    <img src={UserProf.src} alt="" />
                                </div>
                                <div className={style.loBycI}>
                                    <p>{user?.name}</p>
                                    <span>{user?.email}</span>
                                </div>
                            </div>
                        </Component>
                    </div>
                </div>
            </main> : 'لطفا وارد حساب کاربری خود شوید'}
        </>
    );
};

export default profile;