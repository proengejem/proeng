import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface InfoModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
}

export function InfoModal({ isOpen, onClose, title, content }: InfoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.75, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 space-y-4 rounded-lg bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">{title}</h3>
              <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-gray-600">{content}</p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}