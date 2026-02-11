import { MdClose } from "react-icons/md";
import { ModalProps } from "../models/modal-props";

const BookModal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-1000 bg-black/70" />
      <div className="fixed right-[50%] bottom-[50%] z-1000 translate-x-[50%] translate-y-[50%] rounded-sm bg-white p-16">
        <button
          aria-label="close-modal"
          className="absolute top-2 right-2 border-1 border-gray-400 p-1"
          onClick={onClose}
        >
          <MdClose />
        </button>
        {children}
      </div>
    </>
  );
};

export default BookModal;
