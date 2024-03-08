import { e2p } from "Functions/ConvertNumbers";
import { useEffect, useState } from "react";
import style from "./Pagination.module.css";

function Pagination({ currentPage = 1, setCurrentPage, itemsPerPage = 10, dataLength = 100, showLimit = 5, boxShadow = true }) {

    const pageNumberLimit = showLimit
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(showLimit);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
    const pageNumber = Math.ceil(dataLength / itemsPerPage)


    useEffect(() => {
        setmaxPageNumberLimit(showLimit);
        setminPageNumberLimit(0);
    }, [dataLength])

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    let pages = [];
    for (let i = 1; i <= pageNumber; i++) {
        pages.push(i);
    }
    const renderPageNumbers = pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={handleClick}
                    className={`${style.numb} ${currentPage == number ? style.active : null}`}
                >
                    {e2p(number)}
                </li>
            );
        } else {
            return null;
        }
    });

    const handleNextbtn = () => {
        setCurrentPage(currentPage + 1);

        if (currentPage + 1 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };

    const handlePrevbtn = () => {
        setCurrentPage(currentPage - 1);

        if ((currentPage - 2) < minPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    const handleFirstPage = (event) => {
        setCurrentPage(Number(event.target.id));
        setmaxPageNumberLimit(showLimit);
        setminPageNumberLimit(0);
    }

    const handleLastPage = (event) => {
        setCurrentPage(Number(event.target.id));
        setmaxPageNumberLimit(pageNumber);
        setminPageNumberLimit(pageNumber - showLimit);
    }

    let pageIncrementBtn = null;
    let lastPage = null;
    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li className={style.dots}> &hellip; </li>;
        lastPage = <li id={pageNumber} className={`${style.numb} ${currentPage == pageNumber ? style.active : null}`}
            onClick={handleLastPage}>{e2p(pageNumber)}</li>;
    }

    let pageDecrementBtn = null;
    let firstPage = null;
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <li className={style.dots}> &hellip; </li>;
        firstPage = <li id={1} className={`${style.numb} ${currentPage == 1 ? style.active : null}`}
            onClick={handleFirstPage}>{e2p(1)}</li>;
    };



    return (
        <>
            {pageNumber > 1 &&
                <div className={style.pagination}>
                    <ul className={`${style.pageNumber} ${boxShadow && style.boxShadow}`}>
                        <li
                            onClick={handlePrevbtn}
                            // disabled={currentPage == pages[0] ? true : false}
                            className={`${style.btn} ${currentPage == pages[0] ? style.disable : ''}`}>
                            <svg viewBox="0 0 8 16"><path d="M7.5 8l-5 5L1 11.5 4.75 8 1 4.5 2.5 3l5 5z"></path></svg>
                        </li>
                        {firstPage}
                        {pageDecrementBtn}
                        {renderPageNumbers}
                        {pageIncrementBtn}
                        {lastPage}
                        <li
                            onClick={handleNextbtn}
                            // disabled={currentPage == pages[pages.length - 1] ? true : false}
                            className={`${style.btn} ${currentPage == pages[pages.length - 1] ? style.disable : ''}`}>
                            <svg viewBox="0 0 8 16"><path d="M5.5 3L7 4.5 3.25 8 7 11.5 5.5 13l-5-5 5-5z"></path></svg>
                        </li>
                    </ul>
                </div>
            }
        </>
    );
}

export default Pagination;
