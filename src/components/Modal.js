import React from "react";
const Modal = ({ image, isModalOpen, toggleModal }) => {
  return (
    <div className={`${isModalOpen && "show-modal"} modal-overlay`}>
      <div className="modal-container">
        <img src={image} alt="image" />
        <button className="close-modal-btn" onClick={toggleModal}>
          AAAAAAAAAAAAA
        </button>
      </div>
    </div>
  );
};

// <Modal
//           popUpImage={popUpImage}
//           toggleModal={toggleModal}
//           isModalOpen={isModalOpen}
//         />

export default Modal;
