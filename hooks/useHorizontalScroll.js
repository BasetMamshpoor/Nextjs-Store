import { useState, useEffect, useCallback, useRef } from 'react';

function useSwipeScroll() {
    const [hasSwiped, setHasSwiped] = useState(false)
    const ref = useRef()

    const init = useCallback(() => {
        const slider = ref.current;
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isDown = true;
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            cancelMomentumTracking();
        });

        slider.addEventListener('mouseleave', (e) => {
            e.preventDefault();
            isDown = false;
        });

        slider.addEventListener('mouseup', (e) => {
            e.preventDefault();
            isDown = false;
            beginMomentumTracking();
            setTimeout(() => setHasSwiped(false), 0)
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 1; //scroll-fast
            let prevScrollLeft = slider.scrollLeft;
            slider.scrollLeft = scrollLeft - walk;
            velX = slider.scrollLeft - prevScrollLeft;
            if (slider.scrollLeft - prevScrollLeft && !hasSwiped) {
                setHasSwiped(true)
            }
        });

        // Momentum 
        let velX = 0;
        let momentumID;

        slider.addEventListener('wheel', (e) => {
            e.preventDefault();
            cancelMomentumTracking();
        });

        function beginMomentumTracking() {
            cancelMomentumTracking();
            momentumID = requestAnimationFrame(momentumLoop);
        }
        function cancelMomentumTracking() {
            cancelAnimationFrame(momentumID);
        }
        function momentumLoop() {
            slider.scrollLeft += velX;
            velX *= .9;
            if (Math.abs(velX) > 0.5) {
                momentumID = requestAnimationFrame(momentumLoop);
            }
        }
    })

    useEffect(() => {
        init();
    }, [])

    return ref
}

export default useSwipeScroll