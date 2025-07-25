'use client'

import { Globe, Target, TrendingUp } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'

const stats = [
  {
    label: 'Success Rate',
    value: '95%',
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    label: 'Interviews Completed',
    value: '5K+',
    icon: <Target className="w-6 h-6" />,
  },
  {
    label: 'Countries',
    value: '25+',
    icon: <Globe className="w-6 h-6" />,
  },
]

const StatSection = () => {
  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-[#171717]/10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 text-center border-2 border-white/10"
            >
              <div className="w-14 h-14 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                {stat.icon}
              </div>
              <div className="text-4xl font-extrabold text-foreground">{stat.value}</div>
              <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatSection