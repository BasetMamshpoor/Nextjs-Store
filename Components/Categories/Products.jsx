import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Product from './shared/Product';
import InfiniteScroll from 'Components/InfiniteScroll';
import useGetRequest from 'hooks/useGetRequest';
import { e2p } from 'Functions/ConvertNumbers';
import { getProducts } from 'api/products';
import decodeQueryData from 'Functions/decodeQueryData';
import style from './Products.module.css'

const Products = ({ category, total_Items }) => {
    const router = useRouter()


    const [products, setProducts, reload, pagination, setPagination] = useGetRequest(`/products/filter/${category}?${decodeQueryData(router.query)}`, 1)

    useEffect(() => {
        total_Items.current.innerText = `${pagination ? e2p(pagination.meta.total) : e2p(0)} کالا`
    }, [pagination])

    const loadMoreItems = async (page) => {
        const products = await getProducts(category, router.query, page)
        if (!!products) {
            setProducts(prev => {
                return prev.concat(products.data)
            })
            const { data, ...pagination } = products
            setPagination(pagination)
        }
        return true
    }

    return (
        <>
            {products && products.length ? <div>
                <InfiniteScroll
                    loadMoreItems={loadMoreItems}
                    isEnd={pagination.links.next ? false : true}
                    dataLength={products.length}
                    pageStart={1}
                    className={style.productsList}
                >
                    {products.map(i => <Product key={i.id} {...i} />)}
                </InfiniteScroll>
            </div> : <p>محصولی پیدا نشد لطفا فیلتر ها رو تغییر بدید.</p>}
        </>
    );
};

export default React.memo(Products);