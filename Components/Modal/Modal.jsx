import React, { useEffect, useState } from 'react'
import style from './Modal.module.css'
import { SlClose } from 'react-icons/sl'

const Modal = ({ content }) => {
    const [isOpen, setIsOpen] = useState(true)

    const childrenWithProps = React.Children.map(content, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { setIsOpen });
        }
        return child;
    });

    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = 'auto'
    }, [isOpen])

    useEffect(() => {
        const handleBackButton = (event) => setIsOpen(false)

        window.addEventListener('popstate', handleBackButton);

        return () => window.removeEventListener('popstate', handleBackButton);
    }, []);


    return isOpen
        ? <>
            <div onClick={() => setIsOpen(false)} className={style.modal_background} />

            <div className={style.modal} >
                <button className={style.close} onClick={() => setIsOpen(false)}><SlClose /></button>
                {childrenWithProps}
            </div>
        </>
        : ''
}

export default Modal