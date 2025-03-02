import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles.scss";

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="modal-container"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          exit={{ y: -50 }}
        >
          <p className="modal-message">{message}</p>
          <div className="modal-buttons">
            <button className="modal-button confirm" onClick={onConfirm}>
              Yes
            </button>
            <button className="modal-button cancel" onClick={onCancel}>
              No
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConfirmModal;
