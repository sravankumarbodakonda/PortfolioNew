'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github } from 'lucide-react'
import { useState } from 'react'

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
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
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
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              whileHover={{ y: -10 }}
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
                  >
                    <ExternalLink className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href={project.github}
                    className="p-3 bg-white rounded-full hover:bg-primary-500 hover:text-white transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
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
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
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

