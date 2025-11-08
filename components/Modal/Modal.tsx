// 'use client'
// import { useEffect } from "react";
// //mport NoteForm from "../NoteForm/NoteForm";
// import css from "./Modal.module.css";
// import { createPortal } from "react-dom";

// interface ModalProps {
//   onClose: () => void;
//   children: React.ReactNode;
// }
// const Modal = ({ onClose,children }: ModalProps) => {
//   const handleBackdropClick = (
//     event: React.MouseEvent<HTMLDivElement>
//   ): void => {
//     if (event.target === event.currentTarget) {
//       onClose();
//     }
//   };

//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) : void => {
//       if(event.key === "Escape") {
//         onClose();
//       }
//     }
//     document.addEventListener('keydown' , handleKeyDown);
//       const originalOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";

//     return () => {
//       document.removeEventListener("keydown",handleKeyDown);
//       document.body.style.overflow = originalOverflow;
//     }
//   }, [onClose])

//   return createPortal(
//     <div
//       className={css.backdrop}
//       role="dialog"
//       aria-modal="true"
//       onClick={handleBackdropClick}
//     >
//       <div className={css.modal}>
//         {children}
//       </div>
//     </div>,
//     document.getElementById("modal")!
//   );
// };

// export default Modal;

'use client';

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // ✅ кажемо React'у, що DOM уже доступний
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    // ✅ блокуємо скрол на html і body
    const html = document.documentElement;
    const originalHtmlOverflow = html.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      html.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
    };
  }, [onClose]);

  // 🚨 ключова частина: не рендеримо портал, поки DOM не готовий
  if (!mounted) return null;

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body // 👈 це завжди доступно після mount
  );
};

export default Modal;
