"use client"

import { MessageSquare } from "lucide-react"
import { motion } from "framer-motion"

interface WhatsAppButtonProps {
  phoneNumber: string
  message?: string
}

export default function WhatsAppButton({
  phoneNumber,
  message = "Olá! Gostaria de saber mais sobre o APChat.",
}: WhatsAppButtonProps) {
  const handleClick = () => {
    // Format phone number (remove any non-digit characters)
    const formattedPhone = phoneNumber.replace(/\D/g, "")

    // Create WhatsApp URL with phone and pre-filled message
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`

    // Open in new tab
    window.open(whatsappUrl, "_blank")
  }

  return (
    <motion.button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <MessageSquare className="h-6 w-6" />
      <span className="sr-only">Contato via WhatsApp</span>
    </motion.button>
  )
}

