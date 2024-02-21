import { useRouter } from 'next/router';
import { Authorization } from 'providers/AuthorizationProvider';
import { useContext, useLayoutEffect } from 'react';
import Page404 from 'pages/404'

const withAuth = (WrappedComponent) => {

    const AuthComponent = (props) => {
        const router = useRouter();
        const { tokens, user } = useContext(Authorization)

        const role = router.asPath.split('/')[1]

        useLayoutEffect(() => {
            if (!tokens) router.push('/auth/login');
        }, []);

        if (user?.is_admin)
            return (role === 'admin') ? <WrappedComponent {...props} /> : <Page404 />
        else
            return (role === 'profile') ? <WrappedComponent {...props} /> : <Page404 />
    };

    return AuthComponent;
};

export default withAuth;
