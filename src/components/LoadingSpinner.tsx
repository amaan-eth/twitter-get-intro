import { motion } from "framer-motion";

const LoadingSpinner = () => {
  const spinnerVariants = { animate: { rotate: 360 } };

  const spinnerTransition = {
    duration: 1,
    ease: "linear",
    repeat: Infinity
  };

  return (
    <motion.div
      className={`h-12 w-12 rounded-full border-4 border-gray-300 border-t-gray-600`}
      initial="initial"
      animate="animate"
      variants={spinnerVariants}
      transition={spinnerTransition}></motion.div>
  );
};

export default LoadingSpinner;
