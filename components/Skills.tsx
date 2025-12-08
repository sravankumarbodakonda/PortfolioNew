'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Figma,
  Code,
  Palette,
  Database,
  Cloud,
  Zap,
  Server,
  TestTube,
} from 'lucide-react'

const skillCategories = [
  {
    title: 'Front-End Development',
    icon: Code,
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'Angular', level: 80 },
      { name: 'TypeScript', level: 88 },
      { name: 'JavaScript (ES6+)', level: 92 },
      { name: 'HTML5/CSS3', level: 95 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Bootstrap', level: 85 },
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Back-End Development',
    icon: Server,
    skills: [
      { name: 'Java (8, 11, 17)', level: 92 },
      { name: 'Spring Boot', level: 90 },
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 88 },
      { name: 'REST APIs', level: 93 },
      { name: 'GraphQL', level: 75 },
      { name: 'Microservices', level: 85 },
    ],
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Design & UI Tools',
    icon: Palette,
    skills: [
      { name: 'Figma', level: 90 },
      { name: 'UI/UX Design', level: 88 },
      { name: 'Responsive Design', level: 95 },
      { name: 'Design Systems', level: 85 },
    ],
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Databases & Cloud',
    icon: Cloud,
    skills: [
      { name: 'MySQL/PostgreSQL', level: 90 },
      { name: 'MongoDB', level: 85 },
      { name: 'AWS Services', level: 88 },
      { name: 'Microsoft Azure', level: 80 },
      { name: 'Docker', level: 85 },
      { name: 'Kubernetes', level: 75 },
    ],
    color: 'from-orange-500 to-red-500',
  },
]

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="skills" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Skills & <span className="text-primary-500">Expertise</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-600 mx-auto rounded-full mb-4" />
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A comprehensive toolkit for creating exceptional digital experiences
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <motion.div 
                  className="flex items-center mb-6"
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    className={`p-3 rounded-xl bg-gradient-to-r ${category.color} mr-4`}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: categoryIndex * 0.5 }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {category.title}
                  </h3>
                </motion.div>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div 
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ 
                        duration: 0.5, 
                        delay: categoryIndex * 0.1 + skillIndex * 0.1 
                      }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          {skill.name}
                        </span>
                        <motion.span 
                          className="text-primary-500 font-semibold"
                          initial={{ opacity: 0 }}
                          animate={inView ? { opacity: 1 } : {}}
                          transition={{ 
                            duration: 0.5, 
                            delay: categoryIndex * 0.1 + skillIndex * 0.1 + 0.5 
                          }}
                        >
                          {skill.level}%
                        </motion.span>
                      </div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${category.color} rounded-full relative`}
                          initial={{ width: 0 }}
                          animate={
                            inView
                              ? { width: `${skill.level}%` }
                              : { width: 0 }
                          }
                          transition={{
                            duration: 1.2,
                            delay: categoryIndex * 0.1 + skillIndex * 0.1,
                            ease: 'easeOut',
                          }}
                        >
                          <motion.div
                            className="absolute inset-0 bg-white/30 rounded-full"
                            animate={{
                              x: ['-100%', '100%'],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 1,
                              delay: categoryIndex * 0.1 + skillIndex * 0.1 + 1,
                            }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            Additional Technologies & Tools
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              'Python', 'C++', 'SQL/PL-SQL', 'Spring MVC', 'Spring Security',
              'Hibernate', 'JPA', 'Redis', 'Apache Kafka', 'Git/GitHub',
              'Jenkins', 'JUnit', 'Jest', 'Postman', 'Selenium',
              'JIRA', 'Confluence', 'Swagger', 'OAuth 2.0', 'JWT',
              'Agile/Scrum', 'Docker', 'Kubernetes', 'AWS Lambda',
              'AWS S3', 'Azure Functions', 'Splunk', 'CloudWatch'
            ].map((tool, index) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.02 }}
                className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all text-center border border-gray-200 dark:border-gray-700"
                whileHover={{ scale: 1.05, y: -3 }}
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {tool}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

