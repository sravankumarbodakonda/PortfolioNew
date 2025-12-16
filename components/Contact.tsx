'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Linkedin, Github, Send, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { useToast } from './useToast'
import ToastContainer from './Toast'
import emailjs from '@emailjs/browser'

interface ValidationErrors {
  name?: string
  email?: string
  message?: string
}

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const { toasts, success, error, removeToast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) {
          return 'Name is required'
        }
        if (value.trim().length < 2) {
          return 'Name must be at least 2 characters'
        }
        if (value.trim().length > 50) {
          return 'Name must be less than 50 characters'
        }
        if (!/^[a-zA-Z\s'-]+$/.test(value.trim())) {
          return 'Name can only contain letters, spaces, hyphens, and apostrophes'
        }
        return undefined

      case 'email':
        if (!value.trim()) {
          return 'Email is required'
        }
        if (!validateEmail(value.trim())) {
          return 'Please enter a valid email address'
        }
        return undefined

      case 'message':
        if (!value.trim()) {
          return 'Message is required'
        }
        if (value.trim().length < 10) {
          return 'Message must be at least 10 characters'
        }
        if (value.trim().length > 1000) {
          return 'Message must be less than 1000 characters'
        }
        return undefined

      default:
        return undefined
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Real-time validation for touched fields
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate all fields
    const newErrors: ValidationErrors = {}
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData])
      if (error) {
        newErrors[key as keyof ValidationErrors] = error
      }
      setTouched((prev) => ({ ...prev, [key]: true }))
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      error('Please fix the errors in the form before submitting.')
      return
    }

    setIsSubmitting(true)
    
    // Send email using EmailJS (free service)
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || ''
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || ''
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''

      // Check if EmailJS is configured
      if (!serviceId || !templateId || !publicKey || 
          serviceId === 'YOUR_SERVICE_ID' || 
          templateId === 'YOUR_TEMPLATE_ID' || 
          publicKey === 'YOUR_PUBLIC_KEY') {
        // Fallback: Show success message but log that EmailJS needs setup
        console.warn('EmailJS not configured. Please set up your credentials in .env.local')
        await new Promise((resolve) => setTimeout(resolve, 1000))
        success('Thank you for your message! I will get back to you soon. 🚀', 6000)
        setFormData({ name: '', email: '', message: '' })
        setErrors({})
        setTouched({})
        return
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Sravan Kumar',
        reply_to: formData.email,
      }

      console.log('Sending email with EmailJS...', { serviceId, templateId })
      const response = await emailjs.send(serviceId, templateId, templateParams, publicKey)
      console.log('EmailJS Response:', response)

      if (response.status === 200) {
        success('Thank you for your message! I will get back to you soon. 🚀', 6000)
        setFormData({ name: '', email: '', message: '' })
        setErrors({})
        setTouched({})
      } else {
        throw new Error('Email sending failed')
      }
    } catch (err: any) {
      console.error('EmailJS Error Details:', {
        error: err,
        status: err?.status,
        text: err?.text,
        serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      })
      
      let errorMessage = 'Failed to send message. '
      if (err?.status === 0) {
        errorMessage += 'Please check your EmailJS configuration in .env.local'
      } else if (err?.text) {
        errorMessage += err.text
      } else {
        errorMessage += 'Please try again later or contact me directly via email.'
      }
      
      error(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <ToastContainer toasts={toasts} onClose={removeToast} />
      <section
        id="contact"
        ref={ref}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50 relative"
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
                href="https://www.linkedin.com/in/sravankumarbodakonda7093/"
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
              noValidate
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <motion.input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 pr-10 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all ${
                        errors.name
                          ? 'border-red-500 dark:border-red-500'
                          : touched.name && !errors.name
                          ? 'border-green-500 dark:border-green-500'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Your Name"
                      whileFocus={{ scale: 1.02 }}
                    />
                    {touched.name && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {errors.name ? (
                          <XCircle className="w-5 h-5 text-red-500" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </motion.div>
                    )}
                  </div>
                  {errors.name && touched.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <motion.input
                      type="text"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="email"
                      className={`w-full px-4 py-3 pr-10 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all ${
                        errors.email
                          ? 'border-red-500 dark:border-red-500'
                          : touched.email && !errors.email
                          ? 'border-green-500 dark:border-green-500'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="your.email@example.com"
                      whileFocus={{ scale: 1.02 }}
                    />
                    {touched.email && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {errors.email ? (
                          <XCircle className="w-5 h-5 text-red-500" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </motion.div>
                    )}
                  </div>
                  {errors.email && touched.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formData.message.length}/1000
                    </span>
                  </div>
                  <div className="relative">
                    <motion.textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={6}
                      maxLength={1000}
                      className={`w-full px-4 py-3 pr-10 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all resize-none ${
                        errors.message
                          ? 'border-red-500 dark:border-red-500'
                          : touched.message && !errors.message
                          ? 'border-green-500 dark:border-green-500'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                      placeholder="Tell me about your project..."
                      whileFocus={{ scale: 1.02 }}
                    />
                    {touched.message && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute right-3 top-3"
                      >
                        {errors.message ? (
                          <XCircle className="w-5 h-5 text-red-500" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </motion.div>
                    )}
                  </div>
                  {errors.message && touched.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-500 flex items-center gap-1"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.message}
                    </motion.p>
                  )}
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
    </>
  )
}

