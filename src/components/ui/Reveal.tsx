import { motion, type HTMLMotionProps } from 'motion/react'
import { fadeUp, stagger, viewportOnce } from '../../lib/motion'

type RevealProps = HTMLMotionProps<'div'> & {
  delay?: number
}

/** Fades content up once when it scrolls into view. */
export function Reveal({ delay = 0, children, ...rest }: RevealProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ ...fadeUp.visible, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

type RevealGroupProps = HTMLMotionProps<'div'> & {
  delayChildren?: number
  staggerChildren?: number
}

/** Parent that staggers its `RevealItem` children. */
export function RevealGroup({ delayChildren = 0, staggerChildren = 0.07, children, ...rest }: RevealGroupProps) {
  return (
    <motion.div
      variants={stagger(delayChildren, staggerChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, ...rest }: HTMLMotionProps<'div'>) {
  return (
    <motion.div variants={fadeUp} {...rest}>
      {children}
    </motion.div>
  )
}
