import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import type { Ingredient, Product } from '../../data/products'
import { easeOutExpo } from '../../lib/motion'
import { GlassCard } from '../ui/GlassCard'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { SegmentedControl } from '../ui/SegmentedControl'

export function IngredientsPanel({ product }: { product: Product }) {
  const groups = product.ingredientGroups
  const [groupId, setGroupId] = useState(groups[0].id)
  const group = groups.find((g) => g.id === groupId) ?? groups[0]
  const total = groups.reduce((sum, g) => sum + g.items.length, 0)

  return (
    <section id="ingredients" className="section-pad scroll-mt-24">
      <div className="container-site">
        <SectionHeading
          eyebrow="Inside every softgel"
          title={
            <>
              <span className="text-gradient-brand">{total} actives.</span> Nothing you don&apos;t need.
            </>
          }
          description="Herbal adaptogens, essential vitamins and minerals, and amino acids, each at a dose that does its job."
        />

        <Reveal className="mt-10 flex justify-center">
          <SegmentedControl
            id={`${product.slug}-ingredients`}
            value={groupId}
            onChange={setGroupId}
            options={groups.map((g) => ({ value: g.id, label: g.label, shortLabel: g.shortLabel, count: g.items.length }))}
          />
        </Reveal>

        <Reveal className="mt-8">
          <GlassCard className="overflow-hidden p-2 sm:p-3">
            <AnimatePresence mode="wait" initial={false}>
              <motion.ul
                key={group.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: easeOutExpo }}
                className="divide-y divide-white/[0.06]"
              >
                {group.items.map((item, index) => (
                  <IngredientRow key={item.name} item={item} index={index} />
                ))}
              </motion.ul>
            </AnimatePresence>
          </GlassCard>
          <p className="mt-4 text-center text-xs text-muted/80">
            Doses per {product.softgelsPerDay}-softgel daily serving, as printed on the pack. RDA = recommended daily allowance.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function IngredientRow({ item, index }: { item: Ingredient; index: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4, ease: easeOutExpo }}
      className="grid gap-2 px-4 py-4 sm:px-5 md:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)_minmax(0,2fr)] md:items-center md:gap-6"
    >
      <p className="font-display font-semibold">{item.name}</p>
      <div className="flex items-center gap-3">
        <span className="text-gradient-gold shrink-0 font-display text-sm font-semibold tabular">{item.strength}</span>
        {item.rda !== undefined && (
          <span className="flex flex-1 items-center gap-2" aria-label={`${item.rda}% of recommended daily allowance`}>
            <span className="h-1.5 w-full max-w-[120px] overflow-hidden rounded-full bg-white/10">
              <motion.span
                className="block h-full rounded-full bg-gradient-brand"
                initial={{ width: 0 }}
                whileInView={{ width: `${item.rda}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.1 + index * 0.05 }}
              />
            </span>
            <span className="text-xs text-muted tabular">{item.rda}% RDA</span>
          </span>
        )}
      </div>
      <p className="text-sm leading-relaxed text-muted">{item.benefit}</p>
    </motion.li>
  )
}
