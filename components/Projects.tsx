'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github } from 'lucide-react'
import { useState } from 'react'
import { useSound } from './SoundProvider'

const projects = [
  {
    id: 1,
    title: 'Grocery Store App',
    description: 'A full-stack e-commerce grocery application with real-time inventory management, secure payment processing, and seamless shopping experience. Features include user authentication, cart management, order tracking, and admin dashboard.',
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=600&fit=crop',
    tags: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'MongoDB', 'REST API', 'RabbitMQ', 'Docker', 'AWS EC2', 'S3', 'Stripe', 'GitHub Actions'],
    link: '#',
    github: '#',
  },
  {
    id: 2,
    title: 'RestroRealm',
    description: 'A comprehensive restaurant management website with online ordering, table reservations, menu management, and payment integration. Built with microservices architecture for scalability and performance.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
    tags: ['Java Full Stack', 'Spring Boot', 'React', 'PostgreSQL', 'MongoDB', 'REST API', 'RabbitMQ', 'Docker', 'AWS EC2', 'S3', 'Amplify', 'Stripe'],
    link: '#',
    github: '#',
  },
  {
    id: 3,
    title: 'Job Hunt App',
    description: 'A job search and recruitment platform connecting job seekers with employers. Features include advanced search filters, resume upload, application tracking, employer dashboard, and real-time notifications.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop',
    tags: ['Java', 'Spring Boot', 'React', 'SQL', 'PostgreSQL', 'MongoDB', 'REST API', 'RabbitMQ', 'Docker', 'AWS EC2', 'S3', 'GitHub Actions'],
    link: '#',
    github: '#',
  },
  {
    id: 4,
    title: 'Patient Management System',
    description: 'HIPAA-compliant healthcare system for managing appointments, prescriptions, and electronic medical records. Built with microservices architecture, featuring RBAC via Spring Security, GraphQL integration, and event-driven workflows using Apache Kafka. Achieved 25% performance improvement and 99.99% uptime.',
    image: 'data:image/jpeg;base64,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',
    tags: ['Java 17', 'Spring Boot', 'Hibernate', 'JPA', 'React.js', 'Next.js', 'Tailwind CSS', 'PostgreSQL', 'DynamoDB', 'GraphQL', 'Apache Kafka', 'JWT', 'OAuth 2.0', 'AWS EC2', 'S3', 'Lambda', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'JUnit', 'Splunk', 'CloudWatch'],
    link: '#',
    github: '#',
  },
  {
    id: 5,
    title: 'Insurance Management Platform',
    description: 'Enterprise-grade platform enabling policyholders and agents to manage policies, file claims, process payments, and track coverage lifecycles. Features dual-database architecture with PostgreSQL and MongoDB, event-driven workflows with Apache Kafka, and automated CI/CD pipelines.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
    tags: ['Spring Boot', 'Microservices', 'JPA', 'Hibernate', 'React.js', 'Redux', 'GraphQL', 'PostgreSQL', 'MongoDB', 'Amazon SQS', 'SNS', 'AWS Lambda', 'S3', 'Apache Kafka', 'Docker', 'Jenkins', 'JUnit', 'Mockito', 'Prometheus', 'Grafana', 'Datadog'],
    link: '#',
    github: '#',
  },
  {
    id: 6,
    title: 'Digital Banking Suite',
    description: 'PCI-DSS compliant, cloud-native banking platform with real-time transaction dashboards, credit limit management, and secure token-based workflows. Features Angular 11 frontend, Redis/Cosmos DB storage, RabbitMQ for event-driven communication, and Azure deployment with 85%+ test coverage.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tags: ['Spring Boot', 'Microservices', 'Java 17', 'Spring MVC', 'Angular 11', 'TypeScript', 'NgRx', 'Tailwind CSS', 'SCSS', 'OAuth 2.0', 'Hibernate', 'JPA', 'Redis', 'Cosmos DB', 'Azure SQL', 'Azure App Services', 'Blob Storage', 'RabbitMQ', 'JUnit', 'Postman', 'Cypress', 'GitLab CI', 'Log4j', 'Azure Monitor'],
    link: '#',
    github: '#',
  },
]

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const { playSound } = useSound()

  return (
    <section
      id="projects"
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
            Featured <span className="text-primary-500">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-600 mx-auto rounded-full mb-4" />
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A collection of my full-stack projects built with modern technologies,
            showcasing scalable architecture and best practices
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              onMouseEnter={() => {
                setHoveredId(project.id)
                playSound('hover')
              }}
              onMouseLeave={() => setHoveredId(null)}
              whileHover={{ y: -10, scale: 1.02 }}
              style={{ perspective: 1000 }}
            >
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredId === project.id ? 1 : 0,
                  }}
                  className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-4 gap-4"
                >
                  <motion.a
                    href={project.link}
                    className="p-3 bg-white rounded-full hover:bg-primary-500 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => playSound('click')}
                    onMouseEnter={() => playSound('hover')}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href={project.github}
                    className="p-3 bg-white rounded-full hover:bg-primary-500 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => playSound('click')}
                    onMouseEnter={() => playSound('hover')}
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                </motion.div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ 
                        duration: 0.3, 
                        delay: index * 0.1 + tagIndex * 0.05 
                      }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full cursor-default"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

