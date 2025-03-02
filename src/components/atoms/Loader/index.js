import { motion } from "framer-motion";
import "./styles.scss";

const Loader = () => {
  return (
    <motion.div
      className="loader-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="loader"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <p className="loader-text">Loading...</p>
    </motion.div>
  );
};

export default Loader;
