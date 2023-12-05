import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Product from './shared/Product';
import InfiniteScroll from 'Components/InfiniteScroll';
import useRequest from 'hooks/useRequest';
import { e2p } from 'Functions/ConvertNumbers';
import style from './Products.module.css'
import { getProducts } from 'api/products';
import decodeQueryData from 'Functions/decodeQueryData';

const Products = ({ category, total_Items }) => {
    const router = useRouter()


    const [products, setProducts, reload, pagination, setPagination] = useRequest(`/products`, 1)

    useEffect(() => {
        total_Items.current.innerText = `${pagination ? e2p(pagination.meta.total) : e2p(0)} کالا`
    }, [pagination])

    // const loadMoreItems = async (page) => {
    //     const products = await getProducts(category, router.query, page)
    //     if (!!products) {
    //         setProducts(prev => {
    //             return prev.concat(products.data)
    //         })
    //         const { data, ...pagination } = products
    //         setPagination(pagination)
    //     }
    //     return true
    // }

    return (
        <>
            {products && products.length ? <div>
                <InfiniteScroll
                    // loadMoreItems={loadMoreItems}
                    isEnd={pagination.links.next ? false : true}
                    dataLength={products.length}
                    pageStart={1}
                    className={style.productsList}
                >
                    {products.map(i => <Product key={i.id} {...i} setProducts={setProducts} />)}
                </InfiniteScroll>
            </div> : <p>محصولی پیدا نشد لطفا فیلتر ها رو تغییر بدید.</p>}
        </>
    );
};

export default React.memo(Products);