import { useState } from 'react';
import { FaRegImage } from "react-icons/fa";


const ShowImage = ({publicId}) => {
  const [isOpen, setIsOpen] = useState(false);

  const cloudName = 'expensetracker45';

  const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${publicId}.jpg`;

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button className="open-btn" onClick={openModal}><FaRegImage /></button>

      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>×</button>
            <img src={imageUrl} alt="Cloudinary" className="modal-image" />
          </div>
        </div>
      )}

      {/* Class-based Inline CSS */}
      <style>{`
        .open-btn {
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          padding: 0;
          background-color: transparent;
        }
          .open-btn:hover {
          background-color: transparent;
          }
        .open-btn svg{
          width: 20px;
          height: 20px;
          fill: #00ff5c
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
        }

        .modal-content {
          position: relative;
          background-color: #ff5200a8;
          padding: 7px;
          border-radius: 8px;
          max-width: 90%;
          max-height: 90%;
          overflow: auto;
          box-shadow: 0 0 20px rgba(0,0,0,0.4);
        }

        .close-btn {
          position: absolute;
          top: 10px;
          right: 15px;
          font-size: 24px;
          border: none;
          background: none;
          cursor: pointer;
        }

        .modal-image {
          max-width: 100%;
          max-height: 80vh;
          display: block;
          margin: 0 auto;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
};

export default ShowImage;
