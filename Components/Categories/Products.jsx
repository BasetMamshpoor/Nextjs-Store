import useRequest from 'hooks/useRequest';
import { useRouter } from 'next/router';
import React from 'react';
import Product from './shared/Product';

const Products = ({ dataFilter }) => {
    const router = useRouter()

    function decodeQueryData(data) {
        const ret = [];
        for (let d in data)
            if (d !== 'type' && d !== 'gender') {
                ret.push(decodeURIComponent(d) + '=' + decodeURIComponent(data[d]));
            }
        return ret.join('&');
    }


    const [products] = useRequest(`/products/filter/21?${decodeQueryData(router.query)}`)

    let ZcfPa = {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        padding: "1rem 0.5rem",
        paddingTop: "0",
    }



    return (
        <>
            {products && <div style={ZcfPa}>
                {products.data.length ? products.data.map(i => <Product key={i.id} {...i} />) : <p>no product</p>}
            </div>}
        </>
    );
};

export default React.memo(Products);