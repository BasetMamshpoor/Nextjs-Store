// const InfiniteScroll = ({
//     children,
//     element,
//     hasMore,
//     initialLoad,
//     isReverse,
//     loader,
//     loadMore,
//     pageStart,
//     getScrollParent,
//     threshold,
//     useCapture,
//     useWindow
// }) => {
//     const scrollComponent = useRef(null);

//     useEffect(() => {
//         let pageLoaded = pageStart;
//         let beforeScrollHeight = 0;
//         let beforeScrollTop = 0;
//         let loadMoreFlag = false;

//         const isPassiveSupported = () => {
//             let passive = false;

//             const testOptions = {
//                 get passive() {
//                     passive = true;
//                 }
//             };

//             try {
//                 document.addEventListener('test', null, testOptions);
//                 document.removeEventListener('test', null, testOptions);
//             } catch (e) {
//                 // ignore
//             }
//             return passive;
//         };

//         const eventListenerOptions = () => {
//             let options = useCapture;

//             if (isPassiveSupported()) {
//                 options = {
//                     useCapture,
//                     passive: true
//                 };
//             } else {
//                 options = {
//                     passive: false
//                 };
//             }
//             return options;
//         };

//         const getParentElement = (el) => {
//             const scrollParent = getScrollParent && getScrollParent();
//             if (scrollParent != null) {
//                 return scrollParent;
//             }
//             return el && el.parentNode;
//         };

//         const filterProps = (props) => {
//             return props;
//         };

//         const mousewheelListener = (e) => {
//             if (e.deltaY === 1 && !isPassiveSupported()) {
//                 e.preventDefault();
//             }
//         };

//         const scrollListener = () => {
//             const el = scrollComponent.current;
//             const scrollEl = window;
//             const parentNode = getParentElement(el);

//             let offset;
//             if (useWindow) {
//                 const doc =
//                     document.documentElement || document.body.parentNode || document.body;
//                 const scrollTop =
//                     scrollEl.pageYOffset !== undefined
//                         ? scrollEl.pageYOffset
//                         : doc.scrollTop;
//                 if (isReverse) {
//                     offset = scrollTop;
//                 } else {
//                     offset = calculateOffset(el, scrollTop);
//                 }
//             } else if (isReverse) {
//                 offset = parentNode.scrollTop;
//             } else {
//                 offset = el.scrollHeight - parentNode.scrollTop - parentNode.clientHeight;
//             }

//             if (
//                 offset < Number(threshold) &&
//                 (el && el.offsetParent !== null)
//             ) {
//                 detachScrollListener();
//                 beforeScrollHeight = parentNode.scrollHeight;
//                 beforeScrollTop = parentNode.scrollTop;
//                 if (typeof loadMore === 'function') {
//                     loadMore((pageLoaded += 1));
//                     loadMoreFlag = true;
//                 }
//             }
//         };

//         const calculateOffset = (el, scrollTop) => {
//             if (!el) {
//                 return 0;
//             }

//             return (
//                 calculateTopPosition(el) +
//                 (el.offsetHeight - scrollTop - window.innerHeight)
//             );
//         };

//         const calculateTopPosition = (el) => {
//             if (!el) {
//                 return 0;
//             }
//             return el.offsetTop + calculateTopPosition(el.offsetParent);
//         };

//         const attachScrollListener = () => {
//             const parentElement = getParentElement(scrollComponent.current);

//             if (!hasMore || !parentElement) {
//                 return;
//             }

//             let scrollEl = window;
//             if (!useWindow) {
//                 scrollEl = parentElement;
//             }

//             scrollEl.addEventListener(
//                 'mousewheel',
//                 mousewheelListener,
//                 eventListenerOptions()
//             );
//             scrollEl.addEventListener(
//                 'scroll',
//                 scrollListener,
//                 eventListenerOptions()
//             );
//             scrollEl.addEventListener(
//                 'resize',
//                 scrollListener,
//                 eventListenerOptions()
//             );

//             if (initialLoad) {
//                 scrollListener();
//             }
//         };

//         const detachScrollListener = () => {
//             let scrollEl = window;
//             if (!useWindow) {
//                 scrollEl = getParentElement(scrollComponent.current);
//             }

//             scrollEl.removeEventListener(
//                 'scroll',
//                 scrollListener,
//                 eventListenerOptions()
//             );
//             scrollEl.removeEventListener(
//                 'resize',
//                 scrollListener,
//                 eventListenerOptions()
//             );
//         };

//         useEffect(() => {
//             attachScrollListener();

//             return () => {
//                 detachScrollListener();
//             };
//         }, []);

//         const renderProps = filterProps({
//             children,
//             element,
//             hasMore,
//             initialLoad,
//             isReverse,
//             loader,
//             loadMore,
//             pageStart,
//             threshold,
//             useCapture,
//             useWindow,
//             getScrollParent
//         });

//         const childrenArray = [children];
//         if (hasMore) {
//             if (loader) {
//                 isReverse ? childrenArray.unshift(loader) : childrenArray.push(loader);
//             } else if (defaultLoader) {
//                 isReverse
//                     ? childrenArray.unshift(defaultLoader)
//                     : childrenArray.push(defaultLoader);
//             }
//         }

//         return React.createElement(element, { ref: scrollComponent }, childrenArray);
//     }, []);

//     InfiniteScroll.propTypes = {
//         children: PropTypes.node.isRequired,
//         element: PropTypes.node,
//         hasMore: PropTypes.bool,
//         initialLoad: PropTypes.bool,
//         isReverse: PropTypes.bool,
//         loader: PropTypes.node,
//         loadMore: PropTypes.func.isRequired,
//         pageStart: PropTypes.number,
//         getScrollParent: PropTypes.func,
//         threshold: PropTypes.number,
//         useCapture: PropTypes.bool,
//         useWindow: PropTypes.bool
//     };

//     InfiniteScroll.defaultProps = {
//         element: 'div',
//         hasMore: false,
//         initialLoad: true,
//         pageStart: 0,
//         threshold: 250,
//         useWindow: true,
//         isReverse: false,
//         useCapture: false,
//         loader: null,
//         getScrollParent: null
//     };

//     return InfiniteScroll;
// };

// export default InfiniteScroll;
// import React, { useEffect, useRef } from 'react';

// export default function InfiniteScroll(props) {
//     const scrollComponent = useRef(null);
//     const pageLoaded = useRef(props.pageStart);
//     const beforeScrollHeight = useRef(0);
//     const beforeScrollTop = useRef(0);
//     const loadMore = useRef(false);

//     useEffect(() => {
//         const eventListenerOptions = () => {
//             let options = props.useCapture;

//             if (isPassiveSupported()) {
//                 options = {
//                     useCapture: props.useCapture,
//                     passive: true
//                 };
//             } else {
//                 options = {
//                     passive: false
//                 };
//             }
//             return options;
//         };

//         const isPassiveSupported = () => {
//             let passive = false;

//             const testOptions = {
//                 get passive() {
//                     passive = true;
//                 }
//             };

//             try {
//                 document.addEventListener('test', null, testOptions);
//                 document.removeEventListener('test', null, testOptions);
//             } catch (e) {
//                 // ignore
//             }
//             return passive;
//         };

//         const getParentElement = (el) => {
//             const scrollParent =
//                 props.getScrollParent && props.getScrollParent();
//             if (scrollParent != null) {
//                 return scrollParent;
//             }
//             return el && el.parentNode;
//         };

//         const filterProps = (props) => {
//             return props;
//         };

//         const attachScrollListener = () => {
//             const parentElement = getParentElement(scrollComponent.current);

//             if (!props.hasMore || !parentElement) {
//                 return;
//             }

//             let scrollEl = window;
//             if (props.useWindow === false) {
//                 scrollEl = parentElement;
//             }

//             scrollEl.addEventListener(
//                 'mousewheel',
//                 mousewheelListener,
//                 eventListenerOptions() ? eventListenerOptions() : props.useCapture
//             );
//             scrollEl.addEventListener(
//                 'scroll',
//                 scrollListener,
//                 eventListenerOptions() ? eventListenerOptions() : props.useCapture
//             );
//             scrollEl.addEventListener(
//                 'resize',
//                 scrollListener,
//                 eventListenerOptions() ? eventListenerOptions() : props.useCapture
//             );

//             if (props.initialLoad) {
//                 scrollListener();
//             }
//         };

//         const mousewheelListener = (e) => {
//             if (e.deltaY === 1 && !isPassiveSupported()) {
//                 e.preventDefault();
//             }
//         };

//         const scrollListener = () => {
//             const el = scrollComponent.current;
//             const scrollEl = window;
//             const parentNode = getParentElement(el);

//             let offset;
//             if (props.useWindow) {
//                 const doc =
//                     document.documentElement || document.body.parentNode || document.body;
//                 const scrollTop =
//                     scrollEl.pageYOffset !== undefined
//                         ? scrollEl.pageYOffset
//                         : doc.scrollTop;
//                 if (props.isReverse) {
//                     offset = scrollTop;
//                 } else {
//                     offset = calculateOffset(el, scrollTop);
//                 }
//             } else if (props.isReverse) {
//                 offset = parentNode.scrollTop;
//             } else {
//                 offset = el.scrollHeight - parentNode.scrollTop - parentNode.clientHeight;
//             }

//             if (
//                 offset < Number(props.threshold) &&
//                 (el && el.offsetParent !== null)
//             ) {
//                 detachScrollListener();
//                 beforeScrollHeight.current = parentNode.scrollHeight;
//                 beforeScrollTop.current = parentNode.scrollTop;
//                 if (typeof props.loadMore === 'function') {
//                     props.loadMore((pageLoaded.current += 1));
//                     loadMore.current = true;
//                 }
//             }
//         };

//         const calculateOffset = (el, scrollTop) => {
//             if (!el) {
//                 return 0;
//             }

//             return (
//                 calculateTopPosition(el) +
//                 (el.offsetHeight - scrollTop - window.innerHeight)
//             );
//         };

//         const calculateTopPosition = (el) => {
//             if (!el) {
//                 return 0;
//             }
//             return el.offsetTop + calculateTopPosition(el.offsetParent);
//         };

//         const renderProps = filterProps(props);
//         const {
//             children,
//             element,
//             hasMore,
//             initialLoad,
//             isReverse,
//             loader,
//             loadMore,
//             pageStart,
//             ref,
//             threshold,
//             useCapture,
//             useWindow,
//             getScrollParent,
//             ...otherProps
//         } = renderProps;

//         const childrenArray = [children];
//         if (hasMore) {
//             if (loader) {
//                 isReverse ? childrenArray.unshift(loader) : childrenArray.push(loader);
//             } else if (defaultLoader) {
//                 isReverse
//                     ? childrenArray.unshift(defaultLoader)
//                     : childrenArray.push(defaultLoader);
//             }
//         }

//         return React.createElement(element, { ...otherProps, ref: scrollComponent }, childrenArray);
//     }, []);

//     return null;
// }

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const InfiniteScroll = ({
    children,
    element = 'div',
    hasMore = false,
    initialLoad = true,
    isReverse = false,
    loader = null,
    loadMore,
    pageStart = 0,
    getScrollParent = null,
    threshold = 250,
    useCapture = false,
    useWindow = true
}) => {
    const scrollComponent = useRef(null);
    const [pageLoaded, setPageLoaded] = useState(pageStart);
    const [beforeScrollHeight, setBeforeScrollHeight] = useState(0);
    const [beforeScrollTop, setBeforeScrollTop] = useState(0);
    const options = useEventListenerOptions();

    useEffect(() => {
        if (isReverse && loadMore) {
            const parentElement = getParentElement(scrollComponent.current);
            parentElement.scrollTop =
                parentElement.scrollHeight -
                beforeScrollHeight +
                beforeScrollTop;
        }
        attachScrollListener();

        return () => {
            detachScrollListener();
            detachMousewheelListener();
        };
    }, []);

    const useEventListenerOptions = () => {
        let options = useCapture;

        const isPassiveSupported = () => {
            let passive = false;

            const testOptions = {
                get passive() {
                    passive = true;
                }
            };

            try {
                document.addEventListener('test', null, testOptions);
                document.removeEventListener('test', null, testOptions);
            } catch (e) {
                // ignore
            }
            return passive;
        };

        if (isPassiveSupported()) {
            options = {
                useCapture,
                passive: true
            };
        } else {
            options = {
                passive: false
            };
        }
        return options;
    };

    const getParentElement = el => {
        const scrollParent = getScrollParent && getScrollParent();
        if (scrollParent != null) {
            return scrollParent;
        }
        return el && el.parentNode;
    };

    const filterProps = props => {
        return props;
    };

    const attachScrollListener = () => {
        const parentElement = getParentElement(scrollComponent.current);

        if (!hasMore || !parentElement) {
            return;
        }

        let scrollEl = window;
        if (!useWindow) {
            scrollEl = parentElement;
        }

        scrollEl.addEventListener(
            'mousewheel',
            mousewheelListener,
            options ? options : useCapture
        );
        scrollEl.addEventListener(
            'scroll',
            scrollListener,
            options ? options : useCapture
        );
        scrollEl.addEventListener(
            'resize',
            scrollListener,
            options ? options : useCapture
        );

        if (initialLoad) {
            scrollListener();
        }
    };

    const detachMousewheelListener = () => {
        let scrollEl = window;
        if (!useWindow) {
            scrollEl = scrollComponent.current.parentNode;
        }

        scrollEl.removeEventListener(
            'mousewheel',
            mousewheelListener,
            options ? options : useCapture
        );
    };

    const detachScrollListener = () => {
        let scrollEl = window;
        if (!useWindow) {
            scrollEl = getParentElement(scrollComponent.current);
        }

        scrollEl.removeEventListener(
            'scroll',
            scrollListener,
            options ? options : useCapture
        );
        scrollEl.removeEventListener(
            'resize',
            scrollListener,
            options ? options : useCapture
        );
    };

    const mousewheelListener = e => {
        if (e.deltaY === 1 && !isPassiveSupported()) {
            e.preventDefault();
        }
    };

    const scrollListener = () => {
        const el = scrollComponent.current;
        const scrollEl = window;
        const parentNode = getParentElement(el);

        let offset;
        if (useWindow) {
            const doc =
                document.documentElement || document.body.parentNode || document.body;
            const scrollTop =
                scrollEl.pageYOffset !== undefined
                    ? scrollEl.pageYOffset
                    : doc.scrollTop;
            if (isReverse) {
                offset = scrollTop;
            } else {
                offset = calculateOffset(el, scrollTop);
            }
        } else if (isReverse) {
            offset = parentNode.scrollTop;
        } else {
            offset =
                el.scrollHeight - parentNode.scrollTop - parentNode.clientHeight;
        }

        if (offset < Number(threshold) && el && el.offsetParent !== null) {
            detachScrollListener();
            setBeforeScrollHeight(parentNode.scrollHeight);
            setBeforeScrollTop(parentNode.scrollTop);
            if (typeof loadMore === 'function') {
                loadMore(pageLoaded + 1);
            }
        }
    };

    const calculateOffset = (el, scrollTop) => {
        if (!el) {
            return 0;
        }

        return (
            calculateTopPosition(el) +
            (el.offsetHeight - scrollTop - window.innerHeight)
        );
    };

    const calculateTopPosition = el => {
        if (!el) {
            return 0;
        }
        return el.offsetTop + calculateTopPosition(el.offsetParent);
    };

    const renderChildren = () => {
        const childrenArray = [children];
        if (hasMore) {
            if (loader) {
                isReverse
                    ? childrenArray.unshift(loader)
                    : childrenArray.push(loader);
            } else if (defaultLoader) {
                isReverse
                    ? childrenArray.unshift(defaultLoader)
                    : childrenArray.push(defaultLoader);
            }
        }
        return childrenArray;
    };

    return React.createElement(
        element,
        { ref: scrollComponent },
        renderChildren()
    );
};

InfiniteScroll.propTypes = {
    children: PropTypes.node.isRequired,
    element: PropTypes.node,
    hasMore: PropTypes.bool,
    initialLoad: PropTypes.bool,
    isReverse: PropTypes.bool,
    loader: PropTypes.node,
    loadMore: PropTypes.func.isRequired,
    pageStart: PropTypes.number,
    getScrollParent: PropTypes.func,
    threshold: PropTypes.number,
    useCapture: PropTypes.bool,
    useWindow: PropTypes.bool
};

export default InfiniteScroll;
