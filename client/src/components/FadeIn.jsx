import React from 'react'
import { easeInOut, motion } from "motion/react"

const FadeIn = ({ children, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay, ease: easeInOut }}
        >
            {children}
        </motion.div>
    )
}

export default FadeIn