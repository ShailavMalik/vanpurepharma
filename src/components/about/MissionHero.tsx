import { motion } from 'motion/react'
import { mission } from '../../data/about'
import { site } from '../../data/site'
import { easeOutExpo, lineReveal } from '../../lib/motion'
import { Chip } from '../ui/Chip'

export function MissionHero() {
  return (
    <section className="relative pt-32 sm:pt-36 lg:pt-44">
      <div className="container-site max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="eyebrow text-gradient-brand"
        >
          About {site.name}
        </motion.p>
        <h1 className="mt-5 text-[clamp(2.25rem,5.5vw,4.5rem)] font-bold leading-[1.05]">
          <span className="block overflow-hidden pb-1">
            <motion.span
              className="block"
              variants={lineReveal}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1, duration: 0.8, ease: easeOutExpo }}
            >
              Wellness that people can
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-2">
            <motion.span
              className="text-gradient-brand block"
              variants={lineReveal}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2, duration: 0.8, ease: easeOutExpo }}
            >
              actually take control of.
            </motion.span>
          </span>
        </h1>
        {mission.paragraphs.map((paragraph, index) => (
          <motion.p
            key={paragraph.slice(0, 24)}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.4 + index * 0.12 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg"
          >
            {paragraph}
          </motion.p>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.7 }}
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {mission.chips.map((chip) => (
            <Chip key={chip}>{chip}</Chip>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
