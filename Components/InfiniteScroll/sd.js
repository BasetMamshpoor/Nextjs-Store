import React, { useRef, useEffect } from 'react';
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
    useWindow = true,
    ...props
}) => {
    const scrollComponent = useRef(null);
    let pageLoaded = pageStart;
    let beforeScrollHeight = 0;
    let beforeScrollTop = 0;
    let loadMoreFlag = false;

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

    const eventListenerOptions = () => {
        let options = useCapture;

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
            offset = el.scrollHeight - parentNode.scrollTop - parentNode.clientHeight;
        }

        if (offset < Number(threshold) && (el && el.offsetParent !== null)) {
            detachScrollListener();
            beforeScrollHeight = parentNode.scrollHeight;
            beforeScrollTop = parentNode.scrollTop;
            if (typeof loadMore === 'function') {
                loadMore((pageLoaded += 1));
                loadMoreFlag = true;
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
            eventListenerOptions()
        );
        scrollEl.addEventListener(
            'scroll',
            scrollListener,
            eventListenerOptions()
        );
        scrollEl.addEventListener(
            'resize',
            scrollListener,
            eventListenerOptions()
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
            eventListenerOptions()
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
            eventListenerOptions()
        );
        scrollEl.removeEventListener(
            'resize',
            scrollListener,
            eventListenerOptions()
        );
    };

    useEffect(() => {
        attachScrollListener();
        return () => {
            detachScrollListener();
            detachMousewheelListener();
        };
    });

    const renderProps = filterProps(props);
    const childrenArray = [children];
    if (hasMore) {
        if (loader) {
            isReverse ? childrenArray.unshift(loader) : childrenArray.push(loader);
        } else if (defaultLoader) {
            isReverse
                ? childrenArray.unshift(defaultLoader)
                : childrenArray.push(defaultLoader);
        }
    }

    return React.createElement(element, {
        ...renderProps,
        ref: node => {
            scrollComponent.current = node;
        }
    }, childrenArray);
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
    ref: PropTypes.func,
    getScrollParent: PropTypes.func,
    threshold: PropTypes.number,
    useCapture: PropTypes.bool,
    useWindow: PropTypes.bool
};

export default InfiniteScroll;