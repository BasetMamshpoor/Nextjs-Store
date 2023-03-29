import axios from 'axios';

import React, { useEffect, useState } from 'react';
import Product from './shared/Product';

const Products = ({ categories }) => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const get = async () => {
            await axios.get(`/products`)
                .then(res => { setProducts(res.data) })
                .catch(err => console.log(err))
        }
        get()
    }, [])

    const ListProduct = products.length ? products.map(i => <Product key={i.id} {...i} />) : <p>no product</p>

    let ZcfPa = {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        padding: "1rem 0.5rem",
        paddingTop: "0",
    }
    return (
        <>
            <div style={ZcfPa}>
                {ListProduct}
            </div>
        </>
    );
};

export default React.memo(Products);