import { useState } from 'react'
import style from './Modal.module.css'
import { SlClose } from 'react-icons/sl'

const Modal = ({ content }) => {
    const [isOpen, setIsOpen] = useState(true)

    return isOpen
        ? <>
            <div onClick={() => setIsOpen(false)} className={style.modal_background} />

            <div className={style.modal} >
                <button className={style.close} onClick={() => setIsOpen(false)}><SlClose /></button>
                {content}
            </div>
        </>
        : ''
}

export default Modal