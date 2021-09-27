import React, { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";

export default function Modal({ theme, title, children, setModal }) {
  document.getElementsByTagName('BODY')[0].style.overflow = "hidden";

  const ref = useRef('');
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */

    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setModal(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.getElementsByTagName('BODY')[0].style.overflow = "visible";
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div className="modal">
      <div ref={ref} className={`modal-content bg-${theme}`}>
        <div className="modal-content-close">
          <IoMdClose onClick={() => setModal(false)} />
        </div>
        <h1>
          {title}
        </h1>
        <div className="modal-content-main">
          {children}
        </div>
      </div>
    </div>
  )
}