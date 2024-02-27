import { useRouter } from 'next/router';
import { adminRoutes } from '../../lib/adminRoutes';
import Component from 'Components/Sidebar_Component';
import { Authorization } from 'providers/AuthorizationProvider';
import { useContext, useEffect } from 'react';
import withAuth from 'Components/Private/withAuth';

const Vendor = () => {
    const router = useRouter()
    const { vendor } = router.query
    const { tokens } = useContext(Authorization)

    useEffect(() => {
        if (!tokens)
            router.push('/auth/login')
    }, [])

    return (
        <>
            <main>
                <div style={{ margin: '2rem 0' }} dir="rtl">
                    <div className="container">
                        <Component page='admin' query={vendor} links={adminRoutes} />
                    </div>
                </div>
            </main>
        </>
    );
};

export default withAuth(Vendor);