import React from "react";

function Modal({ isOpen, onClose, headerLabel, children }) {
  if (!isOpen) return null; // If modal is not open, return nothing

  const modalRef = React.useRef(null); // ✅ Create a ref for the inner modal

  function handleOverlayClick(event) {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose(); // ✅ Close modal if click is outside
    }
  }

  return (
    <div 
        className="fixed inset-0 bg-gray-500/50 flex justify-center items-center"
        onClick={handleOverlayClick}
    >
      <div ref={modalRef}className="bg-white p-6 rounded shadow-lg w-96">
        {/* ✅ Modal Header */}
        <div className="flex justify-between items-center pb-2">
          <h2 className="text-lg font-bold">{headerLabel}</h2>
          <button 
            onClick={onClose} 
            aria-label="Close"
            className="text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
        </div>

        {/* ✅ Modal Content (AddTaskForm will go here) */}
        <div className="mt-4 flex justify-center items-center">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
