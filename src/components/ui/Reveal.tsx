import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { fadeUp, revealTransition, stagger, viewportOnce } from '../../lib/motion'

interface RevealProps {
  children?: ReactNode
  className?: string
  delay?: number
}

/** Fades content up once when it scrolls into view. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </motion.div>
  )
}

interface RevealGroupProps {
  children?: ReactNode
  className?: string
  delayChildren?: number
  staggerChildren?: number
}

/** Parent that staggers its `RevealItem` children. */
export function RevealGroup({ children, className, delayChildren = 0, staggerChildren = 0.07 }: RevealGroupProps) {
  return (
    <motion.div
      className={className}
      variants={stagger(delayChildren, staggerChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  )
}
