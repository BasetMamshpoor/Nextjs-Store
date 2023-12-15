import { e2p } from 'Functions/ConvertNumbers';
import React, { useEffect, useState } from 'react';

const Timer = ({ time, classNameTimer, classNameEtmam, classNameProgress, withProgress = true }) => {
    const [seconds, setSeconds] = useState(time)

    const formatSeconds = (sec) => {
        if (sec < 0) return 'اتمام تخفیف'
        const pad = (n) => n < 10 ? `0${n}` : n;
        const h = Math.floor(sec / 3600);
        const m = Math.floor(sec / 60) - (h * 60);
        const s = Math.floor(sec - h * 3600 - m * 60);
        return `${e2p(pad(h))} : ${e2p(pad(m))} : ${e2p(pad(s))}`;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(prev => prev - 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <>
            {withProgress && seconds > 0 && <progress className={classNameProgress} value={1 - (seconds / 86400)} />}
            <span className={seconds < 0 ? classNameEtmam : classNameTimer}>
                {(formatSeconds(seconds))}
            </span>
        </>
    );
};

export default Timer;