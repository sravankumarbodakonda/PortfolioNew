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
              <motion.div 
                className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              >
                <motion.h3 
                  className="text-2xl font-bold mb-4 text-gray-800 dark:text-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Full Stack Developer
                </motion.h3>
                <motion.p 
                  className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  I'm a passionate Java Full Stack Developer with expertise in building
                  scalable, efficient, and user-friendly web applications. With extensive
                  experience in both front-end and back-end development, I specialize in
                  designing and implementing end-to-end solutions using modern technologies
                  like React, Angular, Spring Boot, and cloud platforms.
                </motion.p>
                <motion.p 
                  className="text-gray-600 dark:text-gray-300 leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  My approach combines clean code, best practices, and a deep understanding
                  of software architecture to deliver applications that are not only functional
                  but also provide exceptional user experiences. I'm well-versed in microservices,
                  cloud computing, and modern DevOps practices.
                </motion.p>

              </motion.div>
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
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="bg-gradient-to-br from-primary-500/10 to-purple-600/10 dark:from-primary-900/20 dark:to-purple-900/20 rounded-xl p-6 text-center border border-primary-500/20 hover:border-primary-500/40 transition-all relative overflow-hidden"
                  whileHover={{ scale: 1.05, y: -5, rotate: 2 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/20 to-primary-500/0"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                      delay: index * 0.3,
                    }}
                  />
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                  >
                    <Icon className="w-8 h-8 text-primary-500 mx-auto mb-3 relative z-10" />
                  </motion.div>
                  <motion.div 
                    className="text-3xl font-bold text-gray-800 dark:text-white mb-1 relative z-10"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 relative z-10">
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

