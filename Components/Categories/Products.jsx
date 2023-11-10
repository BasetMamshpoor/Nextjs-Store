import useRequest from 'hooks/useRequest';
import { useRouter } from 'next/router';
import React from 'react';
import Product from './shared/Product';

const Products = ({ category }) => {
    const router = useRouter()

    function decodeQueryData(data) {
        const ret = [];
        for (let d in data)
            if (d !== 'type' && d !== 'gender') {
                ret.push(decodeURIComponent(d) + '=' + decodeURIComponent(data[d]));
            }
        return ret.join('&');
    }


    const [products] = useRequest(`/products/filter/${category}?${decodeQueryData(router.query)}`,)

    let ZcfPa = {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        padding: "1rem 0.5rem",
        paddingTop: "0",
    }



    return (
        <>
            {products && products.length ? <div style={ZcfPa}>
                {products.map(i => <Product key={i.id} {...i} />)}
            </div> : <p>محصولی پیدا نشد لطفا فیلتر ها رو تغییر بدید.</p>}
        </>
    );
};

export default React.memo(Products);