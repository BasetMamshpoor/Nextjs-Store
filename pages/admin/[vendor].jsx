import { useRouter } from 'next/router';
import adminRoutes from './routes';
import Component from 'Components/Sidebar_Component';

const Vendor = () => {
    const router = useRouter()
    const { vendor } = router.query

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

export async function getStaticPaths() {

    return {
        paths: [
            { params: { vendor: 'new-product' } },
            { params: { vendor: 'dashboard' } },
            { params: { vendor: 'products' } },
            { params: { vendor: 'slider' } },
            { params: { vendor: 'orders' } },
            { params: { vendor: 'category' } },
            { params: { vendor: 'brands' } },
        ],
        fallback: false
    }
}
export async function getStaticProps() {

    return {
        props: {}
    }
}

export default Vendor;