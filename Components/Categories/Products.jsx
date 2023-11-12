import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Product from './shared/Product';
import InfiniteScroll from 'Components/InfiniteScroll';
import useInfiniteScrollRequest from 'hooks/useInfiniteScrollRequest';
import axios from 'axios';
import { e2p } from 'Functions/ConvertNumbers';

const Products = ({ category, total_Items }) => {
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(1)

    function decodeQueryData(data) {
        const ret = [];
        for (let d in data)
            if (d !== 'type' && d !== 'gender') {
                ret.push(decodeURIComponent(d) + '=' + decodeURIComponent(data[d]));
            }
        return ret.join('&');
    }


    const [products, setProducts, reload, pagination] = useInfiniteScrollRequest(`/products/filter/${category}?${decodeQueryData(router.query)}`, currentPage)

    let ZcfPa = {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        padding: "1rem 0.5rem",
        paddingTop: "0",
    }

    useEffect(() => {
        // console.log(total_Items.current);
        total_Items.current.innerText = `${pagination ? e2p(pagination.meta.total) : e2p(0)} کالا`
    }, [pagination])

    const loadMore = async () => {
        await axios.get(`/products/filter/${category}?${decodeQueryData(router.query)}`, currentPage + 1)
            .then(res => {
                setProducts(prev => {
                    return prev.concat(res.data.data)
                })
            })
        setCurrentPage(currentPage + 1)
    };



    return (
        <>
            {products && products.length ? <div>
                <InfiniteScroll
                    style={ZcfPa}
                    pageStart={1}
                    loadMore={loadMore}
                    hasMore={pagination.links.next ? true : false}
                    threshold={0}
                    loader={''}
                >
                    {products.map(i => <Product key={i.id} {...i} />)}
                </InfiniteScroll>
            </div> : <p>محصولی پیدا نشد لطفا فیلتر ها رو تغییر بدید.</p>}
        </>
    );
};

export default React.memo(Products);