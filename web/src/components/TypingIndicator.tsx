import { motion } from "framer-motion";

export default function TypingIndicator() {
  return (
    <motion.div
      className="flex items-center gap-1 px-3 py-3 rounded-2xl bg-gray-200 dark:bg-zinc-700 w-fit"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
    >
      <motion.span
        className="w-2 h-2 bg-gray-500 dark:bg-gray-300 rounded-full"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="w-2 h-2 bg-gray-500 dark:bg-gray-300 rounded-full"
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />
      <motion.span
        className="w-2 h-2 bg-gray-500 dark:bg-gray-300 rounded-full"
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
      />
    </motion.div>
  );
}
