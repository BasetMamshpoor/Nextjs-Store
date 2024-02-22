import Loading from 'public/Images/loading.gif'
import React, { useEffect, useState } from 'react';

const InfiniteScroll = ({ children, loadMoreItems, dataLength, isEnd, className, pageStart = 1 }) => {
    const [isFetching, setIsFetching] = useState(false)
    const [page, setPage] = useState(pageStart)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll);
    }, [])

    useEffect(() => {
        if (isFetching && dataLength && !isEnd) {
            const result = loadMoreItems(page + 1);
            if (result) { setPage(page + 1); setIsFetching(false) }
        }
    }, [isFetching, dataLength]);

    function handleScroll() {
        const doc = document
        if ((doc.scrollingElement.scrollHeight - window.innerHeight) <= (doc.documentElement.scrollTop.toFixed()))
            setIsFetching(true);
    }

    return (
        <>
            <div className={className}>
                {children}
            </div>
            {isFetching && !isEnd && <div className='loading_loadmore'><div><img src={Loading.src} alt='loading' /></div></div>}
        </>
    );
};

export default InfiniteScroll;

