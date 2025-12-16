'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, Calendar, MapPin, Award } from 'lucide-react'

const experiences = [
  {
    id: 1,
    title: 'Java Full Stack Developer',
    company: 'ByteBridge Technologies',
    location: 'Remote',
    period: 'May 2025 - Present',
    description: 'Leading development of microservices-based applications using Java, Spring Boot, and React. Implemented CI/CD pipelines, improved system performance by 40%, and mentored junior developers.',
    technologies: ['Java', 'Spring Boot', 'React', 'AWS', 'Docker', 'Kubernetes'],
    type: 'Contract',
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    company: 'Comerica Bank',
    location: 'Austin, Texas',
    period: 'June 2024 - Decemeber 2024',
    description: 'Developed and maintained multiple web applications using modern JavaScript frameworks. Collaborated with cross-functional teams to deliver scalable solutions and improved user experience.',
    technologies: ['JavaScript', 'Node.js', 'React', 'PostgreSQL', 'MongoDB'],
    type: 'Contract',
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    company: 'Wipro Technologies',
    location: 'Hyderabad, India',
    period: 'June 2022 -  December 2023',
    description: 'Built RESTful APIs and frontend interfaces for enterprise applications. Participated in code reviews, implemented best practices, and contributed to architectural decisions.',
    technologies: ['Java', 'Spring MVC', 'Angular', 'MySQL', 'Git'],
    type: 'Full-time',
  },
  {
    id: 3,
    title: 'Java Developer',
    company: 'Techrobots',
    location: 'Hyderabad, India',
    period: 'June 2020 -  May 2022',
    description: 'Built RESTful APIs and frontend interfaces for enterprise applications. Participated in code reviews, implemented best practices, and contributed to architectural decisions.',
    technologies: ['Java', 'Spring MVC', 'Angular', 'MySQL', 'Git'],
    type: 'Contract',
  },

]

const education = [
  {
    id: 1,
    degree: 'Masters in Computer Science and Engineering',
    institution: 'Sacred Heart University',
    location: 'Fairfield, Connecticut',
    period: 'January 2024 - March 2025',
    description: 'Graduated with honors. Focused on software engineering, database systems, and web development.',
  },
]

export default function Experience() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      id="experience"
      ref={ref}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Experience & <span className="text-primary-500">Education</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-600 mx-auto rounded-full mb-4" />
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            My professional journey and educational background
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Experience Timeline */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800 dark:text-white">
                <Briefcase className="w-6 h-6 text-primary-500" />
                Work Experience
              </h3>
            </motion.div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-purple-600" />

              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="relative mb-8 pl-20"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 top-2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg" />

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <h4 className="text-xl font-bold text-gray-800 dark:text-white">
                        {exp.title}
                      </h4>
                      <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full">
                        {exp.type}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {exp.company}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education Timeline */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800 dark:text-white">
                <Award className="w-6 h-6 text-primary-500" />
                Education
              </h3>
            </motion.div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-600" />

              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="relative mb-8 pl-20"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 top-2 w-4 h-4 bg-purple-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg" />

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                    <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                      {edu.degree}
                    </h4>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        {edu.institution}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {edu.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {edu.period}
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

