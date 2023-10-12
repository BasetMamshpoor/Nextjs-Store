import { e2p } from "Functions/ConvertNumbers";
import { useState } from "react";
import style from "./Pagination.module.css";

function Pagination({ currentPage = 1, setCurrentPage, itemsPerPage = 10, dataLength = 100, showLimit = 5, boxShadow = true }) {

    const pageNumberLimit = showLimit
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(showLimit);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    let pages = [];
    for (let i = 1; i <= Math.ceil(dataLength / itemsPerPage); i++) {
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

        if ((currentPage - 1) % pageNumberLimit == 0) {
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    let pageIncrementBtn = null;
    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li className={style.dots} onClick={handleNextbtn}> &hellip; </li>;
    }

    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <li className={style.dots} onClick={handlePrevbtn}> &hellip; </li>;
    };

    return (
        <>
            {Math.ceil(dataLength / itemsPerPage) > 1 &&
                <div className={style.pagination}>
                    <ul className={`${style.pageNumber} ${boxShadow && style.boxShadow}`}>
                        <li
                            onClick={handlePrevbtn}
                            // disabled={currentPage == pages[0] ? true : false}
                            className={`${style.btn} ${currentPage == pages[0] ? style.disable : ''}`}>
                            <svg viewBox="0 0 8 16"><path d="M7.5 8l-5 5L1 11.5 4.75 8 1 4.5 2.5 3l5 5z"></path></svg>
                        </li>
                        {pageDecrementBtn}
                        {renderPageNumbers}
                        {pageIncrementBtn}
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
