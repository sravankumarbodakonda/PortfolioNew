'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Linkedin, Github, Send } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Thank you for your message! I will get back to you soon.')
      setFormData({ name: '', email: '', message: '' })
    }, 1000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section
      id="contact"
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
            Get In <span className="text-primary-500">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-purple-600 mx-auto rounded-full mb-4" />
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a project in mind? Let's collaborate and create something
            amazing together!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                Let's Connect
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your visions. Feel free to reach out
                through any of the channels below.
              </p>
            </div>

            <div className="space-y-4">
              <motion.a
                href="mailto:bodakondasravankumar@gmail.com"
                className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all group"
                whileHover={{ x: 5, scale: 1.02 }}
              >
                <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg mr-4 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                  <Mail className="w-6 h-6 text-primary-500 group-hover:text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800 dark:text-white">
                    Email
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    bodakondasravankumar@gmail.com
                  </div>
                </div>
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/sravankumar7093/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all group"
                whileHover={{ x: 5, scale: 1.02 }}
              >
                <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg mr-4 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                  <Linkedin className="w-6 h-6 text-primary-500 group-hover:text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800 dark:text-white">
                    LinkedIn
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Connect with me
                  </div>
                </div>
              </motion.a>

              <motion.a
                href="https://github.com/sravankumarbodakonda"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all group"
                whileHover={{ x: 5, scale: 1.02 }}
              >
                <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg mr-4 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                  <Github className="w-6 h-6 text-primary-500 group-hover:text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-800 dark:text-white">
                    GitHub
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    View my work
                  </div>
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Name
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all"
                    placeholder="Your Name"
                    whileFocus={{ scale: 1.02, borderColor: 'rgb(59, 130, 246)' }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all"
                    placeholder="your.email@example.com"
                    whileFocus={{ scale: 1.02, borderColor: 'rgb(59, 130, 246)' }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Message
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all resize-none"
                    placeholder="Tell me about your project..."
                    whileFocus={{ scale: 1.02, borderColor: 'rgb(59, 130, 246)' }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-primary-500 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                  whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-primary-500"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                    style={{ zIndex: 0 }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          ⏳
                        </motion.span>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <Send className="w-5 h-5" />
                        </motion.div>
                      </>
                    )}
                  </span>
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

