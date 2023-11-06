import Form from 'Components/Vendor/Form';
import style from './Vendor.module.css'
import { useRouter } from 'next/router';
import Slider from 'Components/Vendor/Slider';
import Category from 'Components/Vendor/Category';
import { useCallback } from 'react';
import Brands from 'Components/Vendor/Brands';
import SidebarList from 'Components/SidebarList';



const Vendor = () => {
    const router = useRouter()
    const { vendor } = router.query

    const Components = useCallback((route) => {
        let cmp = [
            { route: 'new-product', component: <Form />, },
            { route: 'slider', component: <Slider />, },
            { route: 'category', component: <Category />, },
            { route: 'brands', component: <Brands />, },
        ]
        return cmp.find(c => c.route === route)?.component
    }, [])

    return (
        <>
            <main>
                <div className={style.jhhuPxe} dir="rtl">
                    <div className="container">
                        <div className="row">
                            <div className="col-3 ps-3 pe-0">
                                <SidebarList vendor={vendor} style={style} />
                            </div>
                            <div className="col-9">
                                {Components(vendor)}
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