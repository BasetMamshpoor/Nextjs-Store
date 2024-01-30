import Router from 'next/router';
import * as NProgress from 'nprogress';
import * as React from 'react';

const NextNProgress = ({
  color = '#FF0000',
  startPosition = 0.3,
  stopDelayMs = 200,
  height = 2,
  showOnShallow = true,
  options,
  nonce,
  transformCSS = (css) => React.createElement("style", { nonce }, css)
}) => {
  let timer = null;
  React.useEffect(() => {
    if (options) {
      NProgress.configure(options);
    }
    Router.events.on('routeChangeStart', routeChangeStart);
    Router.events.on('routeChangeComplete', routeChangeEnd);
    Router.events.on('routeChangeError', routeChangeError);
    return () => {
      Router.events.off('routeChangeStart', routeChangeStart);
      Router.events.off('routeChangeComplete', routeChangeEnd);
      Router.events.off('routeChangeError', routeChangeError);
    };
  }, []);
  const routeChangeStart = (_, { shallow, }) => {
    if (!shallow || showOnShallow) {
      NProgress.set(startPosition);
      NProgress.start();
    }
  };
  const routeChangeEnd = (_, { shallow, }) => {
    if (!shallow || showOnShallow) {
      if (timer)
        clearTimeout(timer);
      timer = setTimeout(() => {
        NProgress.done(true);
      }, stopDelayMs);
    }
  };
  const routeChangeError = (_err, _url, { shallow, }) => {
    if (!shallow || showOnShallow) {
      if (timer)
        clearTimeout(timer);
      timer = setTimeout(() => {
        NProgress.done(true);
      }, stopDelayMs);
    }
  };
  return transformCSS(`
     #nprogress {
       pointer-events: none;
     }
     #nprogress .bar {
       background: ${color};
       position: fixed;
       z-index: 9999;
       top: 0;
       left: 0;
       width: 100%;
       height: ${height}px;
     }
     #nprogress .peg {
       display: block;
       position: absolute;
       right: 0px;
       width: 100px;
       height: 100%;
       box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
       opacity: 1;
       -webkit-transform: rotate(3deg) translate(0px, -4px);
       -ms-transform: rotate(3deg) translate(0px, -4px);
       transform: rotate(3deg) translate(0px, -4px);
     }

   `);
};

export default React.memo(NextNProgress);