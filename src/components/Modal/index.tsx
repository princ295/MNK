import React, { useEffect, useRef } from "react";
import "./index.css";

interface ModalProps {
  isvisible: boolean
  title?: string,
  children: React.ReactElement
  close: () => void
  width?: number
}

const Modal: React.FC<ModalProps> = ({ isvisible,  width=460, close, children, title = "Title" }) => {

  const modalref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutSideClick = (event:MouseEvent) => {
      const isOutsideClick = modalref.current && !modalref.current.contains(event.target as HTMLElement);
      console.log(isOutsideClick)
      if (isOutsideClick) {
        close()
      }
    }

    if (isvisible) {
      document.addEventListener('mousedown', handleOutSideClick)
    }

    return () => document.removeEventListener('mousedown', handleOutSideClick)
  }, [close, modalref, isvisible])

  return (
    <div className={`modal ${isvisible ? 'show' : 'hide'}`}>
      <div style={{maxWidth: `${width}px`}}  ref={modalref} className="model__content">
        <div className="modal__title">
          <b>{title}</b>
          <button onClick={close} className="close__btn" >✖</button>
        </div>
        <div className="modal__body">{children}</div></div>
    </div>

  )
}

export default Modal;
