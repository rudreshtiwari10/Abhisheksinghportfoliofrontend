import React, { useState } from 'react';
import MessageFormModal from './MessageFormModal';
import './FloatingContact.css';

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    // Restore body scroll
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      {/* Floating Contact Button */}
      <button
        className="floating-contact-btn"
        onClick={openModal}
        aria-label="Send Message"
        title="Send us a message"
      >
        <svg
          className="icon-default"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
            fill="currentColor"
          />
        </svg>
        <span className="floating-contact-text">Message</span>
      </button>

      {/* Modal */}
      <MessageFormModal isOpen={isOpen} onClose={closeModal} />
    </>
  );
};

export default FloatingContact;
