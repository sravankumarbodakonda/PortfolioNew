'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { User, Award, Target, Heart } from 'lucide-react'

const stats = [
  { icon: User, label: 'Projects Completed', value: '50+' },
  { icon: Award, label: 'Years Experience', value: '5+' },
  { icon: Target, label: 'Happy Clients', value: '30+' },
  { icon: Heart, label: 'Design Awards', value: '10+' },
]

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-primary-500">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-purple-600 rounded-2xl blur-2xl opacity-30" />
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                  Full Stack Developer
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  I'm a passionate Java Full Stack Developer with expertise in building
                  scalable, efficient, and user-friendly web applications. With extensive
                  experience in both front-end and back-end development, I specialize in
                  designing and implementing end-to-end solutions using modern technologies
                  like React, Angular, Spring Boot, and cloud platforms.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  My approach combines clean code, best practices, and a deep understanding
                  of software architecture to deliver applications that are not only functional
                  but also provide exceptional user experiences. I'm well-versed in microservices,
                  cloud computing, and modern DevOps practices.
                </p>

              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="bg-gradient-to-br from-primary-500/10 to-purple-600/10 dark:from-primary-900/20 dark:to-purple-900/20 rounded-xl p-6 text-center border border-primary-500/20 hover:border-primary-500/40 transition-all"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <Icon className="w-8 h-8 text-primary-500 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

