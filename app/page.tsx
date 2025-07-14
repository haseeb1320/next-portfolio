"use client"

import { ArrowRight, ExternalLink, Clock, Users, MessageCircle, Video, Globe, Mail, User, MessageSquare, Send, X as XIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import emailjs from 'emailjs-com'
import { useRef, useState, useEffect } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

declare global {
  interface Window {
    Calendly?: any;
  }
}

export default function Home() {
  const formRef = useRef<HTMLFormElement>(null)
  const [contactTab, setContactTab] = useState<'form' | 'booking'>('form')
  const [showCalendly, setShowCalendly] = useState(false)
  const [message, setMessage] = useState('')
  const maxMessageLength = 1000
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')

  useEffect(() => {
    if (contactTab === 'booking') {
      // Load Calendly widget script if not already present
      if (!document.getElementById('calendly-widget-script')) {
        const link = document.createElement('link')
        link.href = 'https://assets.calendly.com/assets/external/widget.css'
        link.rel = 'stylesheet'
        link.id = 'calendly-widget-style'
        document.head.appendChild(link)

        const script = document.createElement('script')
        script.src = 'https://assets.calendly.com/assets/external/widget.js'
        script.async = true
        script.id = 'calendly-widget-script'
        document.body.appendChild(script)

        script.onload = () => {
          if (window.Calendly) {
            window.Calendly.initBadgeWidget({
              url: 'https://calendly.com/haseebaslam1320',
              text: 'Schedule time with me',
              color: '#0069ff',
              textColor: '#ffffff',
              branding: true
            })
          }
        }
      } else if (window.Calendly) {
        window.Calendly.initBadgeWidget({
          url: 'https://calendly.com/haseebaslam1320',
          text: 'Schedule time with me',
          color: '#0069ff',
          textColor: '#ffffff',
          branding: true
        })
      }
    }
    // Optionally, remove the badge when switching back to form
    // (Calendly does not provide a destroy method, so you may need to reload page to remove it)
  }, [contactTab])

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formRef.current) return
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
      )
      .then(
        (result) => {
          alert('Message sent successfully!')
          formRef.current?.reset()
        },
        (error) => {
          alert('Failed to send message. Please try again.')
        }
      )
  }

  const [cardRef, inView] = useInView({ triggerOnce: true, threshold: 0.2 })
  // Add hooks for each section
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const [aboutRef, aboutInView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const [expRef, expInView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const [projectsRef, projectsInView] = useInView({ triggerOnce: true, threshold: 0.2 })
  // Add hooks for more sections
  const [skillsRef, skillsInView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const [educationRef, educationInView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="py-20 md:py-28 container"
        initial={{ opacity: 0, y: 80 }}
        animate={heroInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'anticipate' }}
      >
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              Haseeb Aslam
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">Senior Software Engineer</h2>
            <p className="text-lg text-gray-500 max-w-md mx-auto md:mx-0">
              Full-Stack Developer with 7+ years of experience building scalable, cloud-native applications.
            </p>
            <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
              <Button size="lg" asChild>
                <Link href="#contact">
                  Contact Me <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#projects">View Projects</Link>
              </Button>
            </div>
          </div>
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-gray-200 shadow-xl flex items-center justify-center bg-white">
            <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=320&width=320"
                alt="Haseeb Aslam"
                width={320}
                height={320}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        ref={aboutRef}
        className="py-16 bg-muted/50"
        initial={{ opacity: 0, x: -80 }}
        animate={aboutInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: 'anticipate', delay: 0.1 }}
      >
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">About Me</h2>
          <div className="max-w-3xl">
            <p className="text-lg mb-4">
              I'm a Senior Full-Stack Developer with expertise spanning front-end frameworks (React, Next.js), back-end
              services (Node.js, FastAPI), and cloud platforms (AWS, Azure, GCP).
            </p>
            <p className="text-lg mb-4">
              I have a proven track record in leading cross-functional teams to implement microservices architectures,
              integrate AI-driven analytics, and adopt DevOps practices, resulting in improved system performance and
              reduced operational costs.
            </p>
            <p className="text-lg">
              I'm adept at mentoring engineers, fostering collaborative environments, and aligning technical solutions
              with business objectives to drive innovation and efficiency.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section
        id="experience"
        ref={expRef}
        className="py-16 container"
        initial={{ opacity: 0, x: 80 }}
        animate={expInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: 'anticipate', delay: 0.15 }}
      >
        <h2 className="text-3xl font-bold mb-8">Professional Experience</h2>
        <div className="space-y-12">
          <div className="relative pl-8 border-l-2 border-muted">
            <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1"></div>
            <div className="space-y-2">
              <div className="flex flex-wrap justify-between items-start gap-2">
                <h3 className="text-xl font-semibold">Senior Software Engineer</h3>
                <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                  July 2025 - Present
                </span>
              </div>
              <p className="text-lg font-medium">FLOW Medical Solutions | Riyadh, Saudi Arabia</p>
              <ul className="list-disc list-outside ml-5 space-y-2 text-muted-foreground">
                <li>
                  Designed and developed scalable full stack applications using FastAPI and React, deploying
                  microservices on Azure Kubernetes Service with high availability and auto-scaling capabilities.
                </li>
                <li>
                  Built and deployed AI-powered features for intelligent analytics and prediction using TensorFlow and
                  OpenAI APIs, enhancing system capabilities in data-driven decision-making.
                </li>
                <li>Architected secure, maintainable APIs and implemented OAuth2/JWT authentication protocols.</li>
              </ul>
            </div>
          </div>

          <div className="relative pl-8 border-l-2 border-muted">
            <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-1"></div>
            <div className="space-y-2">
              <div className="flex flex-wrap justify-between items-start gap-2">
                <h3 className="text-xl font-semibold">Senior Software Engineer</h3>
                <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                  July 2018 - July 2025
                </span>
              </div>
              <p className="text-lg font-medium">Abbott | Pakistan</p>
              <ul className="list-disc list-outside ml-5 space-y-2 text-muted-foreground">
                <li>
                  Fostered Agile and DevOps culture with Jenkins, Terraform, and CloudFormation CI/CD pipelines,
                  accelerating release cycles by 50%.
                </li>
                <li>
                  Led code reviews and mentored junior developers to maintain clean code practices and improve long-term
                  maintainability.
                </li>
                <li>
                  Built Kafka-based data ingestion pipelines with Grafana dashboards for real-time monitoring and
                  reporting.
                </li>
                <li>
                  Delivered machine learning-based anomaly detection solutions using TensorFlow and PyTorch, reducing
                  system downtime by 30%.
                </li>
                <li>
                  Built scalable full stack platforms leveraging Next.js and Node.js, incorporating serverless functions
                  for elastic scalability.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        id="skills"
        ref={skillsRef}
        className="py-16 bg-muted/50"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={skillsInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: 'backOut', delay: 0.18 }}
      >
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Technical Skills</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "JavaScript",
                  "TypeScript",
                  "React.js",
                  "Next.js",
                  "Redux",
                  "Vue.js",
                  "Angular",
                  "SASS",
                  "LESS",
                  "Tailwind CSS",
                  "Bootstrap",
                  "Styled Components",
                  "Storybook",
                  "Figma",
                  "Webpack",
                ].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-background rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Backend</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Python",
                  "FastAPI",
                  "Flask",
                  "Django",
                  "Node.js",
                  "Java Spring",
                  "C#",
                  ".NET",
                  "REST APIs",
                  "GraphQL",
                  "WebSocket",
                  "Serverless",
                  "AWS Lambda",
                  "Azure Functions",
                  "Swagger/OpenAPI",
                  "OAuth2",
                  "JWT",
                ].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-background rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Databases & Data Layer</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "PostgreSQL",
                  "MySQL",
                  "SQLite",
                  "MongoDB",
                  "Redis",
                  "Elasticsearch",
                  "Prisma",
                  "Sequelize",
                  "TypeORM",
                  "Mongoose",
                  "Pandas",
                  "Grafana",
                  "D3.js",
                ].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-background rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Cloud & DevOps</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "AWS",
                  "Azure",
                  "GCP",
                  "Heroku",
                  "Terraform",
                  "CloudFormation",
                  "Serverless Framework",
                  "Docker",
                  "Kubernetes",
                  "Jenkins",
                  "Ansible",
                  "CloudWatch",
                  "Vault",
                ].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-background rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">AI & ML</h3>
              <div className="flex flex-wrap gap-2">
                {["TensorFlow", "PyTorch", "OpenAI GPT", "NLP", "Predictive Modeling", "Machine Learning"].map(
                  (skill) => (
                    <span key={skill} className="px-3 py-1 bg-background rounded-full text-sm">
                      {skill}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Collaboration & Tools</h3>
              <div className="flex flex-wrap gap-2">
                {["Git", "Jira", "ServiceNow", "Salesforce", "Shopify", "Google Analytics", "Firebase"].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-background rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        ref={projectsRef}
        className="py-16 container"
        initial={{ opacity: 0, y: 60 }}
        animate={projectsInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'anticipate', delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold mb-8">Personal Projects</h2>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          animate={projectsInView ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
            hidden: {},
          }}
        >
          <motion.div className="bg-card rounded-lg shadow-md overflow-hidden border"
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.96 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
            }}
          >
            <div className="h-48 bg-muted relative">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Decentralized Real Estate Marketplace"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">Decentralized Real Estate Marketplace</h3>
              <p className="text-muted-foreground">
                A blockchain-based platform for property transactions using Solidity, Ethereum, and Polygon.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Solidity", "Ethereum", "Polygon", "Next.js", "Web3.js", "IPFS", "Kafka"].map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-muted rounded-md text-xs">
                    {tech}
                  </span>
                ))}
              </div>
              <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
                <li>Developed a decentralized property transaction platform using Solidity, Ethereum, and Polygon.</li>
                <li>
                  Built frontend with Next.js and Web3.js for wallet integration; used IPFS for secure document storage.
                </li>
                <li>Implemented Apache Kafka for syncing on-chain events with off-chain analytics dashboards.</li>
              </ul>
              <div className="flex gap-3 pt-2">
                <Button asChild size="sm">
                  <a href="https://realestate-dapp-demo.vercel.app" target="_blank" rel="noopener noreferrer">
                    Live Demo <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://github.com/haseebaslam/realestate-dapp" target="_blank" rel="noopener noreferrer">
                    View Code <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div className="bg-card rounded-lg shadow-md overflow-hidden border"
            variants={{
              hidden: { opacity: 0, y: 40, scale: 0.96 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
            }}
          >
            <div className="h-48 bg-muted relative">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="AI-Driven Quantitative Trading Platform"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">AI-Driven Quantitative Trading Platform</h3>
              <p className="text-muted-foreground">An analytics platform with ML models for market predictions.</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "FastAPI",
                  "TensorFlow",
                  "AWS Lambda",
                  "CloudFormation",
                  "WebSocket",
                  "Elasticsearch",
                  "D3.js",
                  "Grafana",
                ].map((tech) => (
                  <span key={tech} className="px-2 py-1 bg-muted rounded-md text-xs">
                    {tech}
                  </span>
                ))}
              </div>
              <ul className="list-disc list-outside ml-5 space-y-1 text-sm text-muted-foreground">
                <li>
                  Built a full stack analytics platform with React + FastAPI; deployed TensorFlow ML models for market
                  predictions.
                </li>
                <li>
                  Used AWS Lambda for microservices, CloudFormation for infrastructure, and WebSocket + Elasticsearch
                  for real-time data.
                </li>
                <li>Visualized insights with D3.js and Grafana; CI/CD pipeline implemented with Jenkins and Docker.</li>
              </ul>
              <div className="flex gap-3 pt-2">
                <Button asChild size="sm">
                  <a href="https://quant-trading-platform.vercel.app" target="_blank" rel="noopener noreferrer">
                    Live Demo <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://github.com/haseebaslam/quant-trading" target="_blank" rel="noopener noreferrer">
                    View Code <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Education Section */}
      <motion.section
        id="education"
        ref={educationRef}
        className="py-16 bg-muted/50"
        initial={{ opacity: 0, rotate: -2 }}
        animate={educationInView ? { opacity: 1, rotate: 0 } : {}}
        transition={{ duration: 0.7, ease: 'anticipate', delay: 0.22 }}
      >
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Education</h2>
          <div className="space-y-8">
            <div className="bg-card rounded-lg p-6 border">
              <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                <h3 className="text-xl font-semibold">Bachelor of Mathematics</h3>
                <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                  2010 - 2012
                </span>
              </div>
              <p className="text-lg font-medium mb-4">UCLA at University, California, Los Angeles</p>
              <ul className="list-disc list-outside ml-5 space-y-1 text-muted-foreground">
                <li>
                  Completed coursework in Advanced Calculus, Linear Algebra, Probability & Statistics, and Stochastic
                  Processes.
                </li>
                <li>
                  Capstone project involved developing a market risk prediction model using time-series analysis and
                  statistical methods.
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-lg p-6 border">
              <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                <h3 className="text-xl font-semibold">Bachelor of Computer Science</h3>
                <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                  2013 - 2017
                </span>
              </div>
              <p className="text-lg font-medium mb-4">Islamia University, Bahawalpur, Pakistan</p>
              <ul className="list-disc list-outside ml-5 space-y-1 text-muted-foreground">
                <li>
                  Studied Machine Learning, Natural Language Processing, Blockchain Technologies, and Cloud Computing.
                </li>
                <li>
                  Capstone project focused on building an Ethereum-based voting dApp integrated with AI-powered fraud
                  detection.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Certifications Section */}
      <section id="certifications" className="py-16 container">
        <h2 className="text-3xl font-bold mb-8">Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-lg p-6 border flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                </svg>
              </div>
            </div>
            <Link href="https://credmark.ai/badge/CM-2507-F1Q1H0Q" target="_blank">
              <div>
                <h3 className="text-lg font-semibold">Test Python Badge (Top 10%)</h3>
                <p className="text-muted-foreground">Credmark, July 2025</p>
              </div>
            </Link>

          </div>

          <div className="bg-card rounded-lg p-6 border flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Meta Full Stack Developer Certificate</h3>
              <p className="text-muted-foreground">Coursera/Meta, January 2019</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Contact Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <p className="text-lg">
                I'm always open to discussing new projects, opportunities, or partnerships. Feel free to reach out to me
                using the contact form or through my email.
              </p>
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>haseebaslam1320@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Riyadh, Saudi Arabia</span>
              </div>
              <div className="flex gap-4 pt-4">
                <a href="https://www.linkedin.com/in/haseeb-aslam-622713b6" target="_blank" className="p-2 bg-background rounded-full hover:bg-primary/10 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                </a>
                <a href="https://github.com/haseeb1320" target="_blank" className="p-2 bg-background rounded-full hover:bg-primary/10 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                </a>
                <a href="https://x.com/haseebasla64598" target="_blank" className="p-2 bg-background rounded-full hover:bg-primary/10 transition-colors">
                  <XIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
            <motion.div
              ref={cardRef}
              className="bg-card rounded-lg shadow-md border p-0 flex flex-col items-center max-w-lg mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {/* Head bar for tabs */}
              <div className="flex w-full overflow-hidden rounded-t-lg">
                <button
                  className={`flex-1 w-full px-4 py-3 font-medium transition-colors border-b-2 focus:outline-none rounded-t-lg ${contactTab === 'form' ? 'border-primary text-primary bg-background' : 'border-transparent text-muted-foreground hover:text-foreground bg-muted/50'}`}
                  onClick={() => setContactTab('form')}
                  type="button"
                >
                  Contact Form
                </button>
                <button
                  className={`flex-1 w-full px-4 py-3 font-medium transition-colors border-b-2 focus:outline-none rounded-t-lg ${contactTab === 'booking' ? 'border-primary text-primary bg-background' : 'border-transparent text-muted-foreground hover:text-foreground bg-muted/50'}`}
                  onClick={() => setContactTab('booking')}
                  type="button"
                >
                  Book a Meeting
                </button>
              </div>
              <div style={{ minHeight: 650 }} className="w-full p-6 flex flex-col items-center">
                {contactTab === 'form' ? (
                  <>
                  <div className="flex flex-col items-center mb-4">
                    <div className="bg-gradient-to-tr from-blue-500 to-purple-400 rounded-full p-4 mb-2">
                      <Mail className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-1">Get in Touch</h3>
                    <p className="text-muted-foreground mb-2">Have a question or want to work together? Send me a message!</p>
                  </div>
                  <form className="space-y-4 w-full text-left" ref={formRef} onSubmit={sendEmail}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="text-xs font-medium flex items-center mb-1">
                          <User className="h-4 w-4 mr-1" /> Name <span className="text-destructive ml-1">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          className="w-full px-2 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                          placeholder="Your full name"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="text-xs font-medium flex items-center mb-1">
                          <Mail className="h-4 w-4 mr-1" /> Email <span className="text-destructive ml-1">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          className="w-full px-2 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                          placeholder="your.email@example.com"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="text-xs font-medium flex items-center mb-1">
                        <MessageCircle className="h-4 w-4 mr-1" /> Subject <span className="text-destructive ml-1">*</span>
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        className="w-full px-2 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        placeholder="Subject of your message"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="text-xs font-medium flex items-center mb-1">
                        <MessageSquare className="h-4 w-4 mr-1" /> Message <span className="text-destructive ml-1">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="w-full px-2 py-2 border rounded-md bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        placeholder="Tell me about your project, question, or how I can help you..."
                        maxLength={maxMessageLength}
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        required
                      ></textarea>
                      <div className="text-xs text-muted-foreground text-right mt-1">{message.length}/{maxMessageLength}</div>
                    </div>
                    <Button
                      className="w-full py-2 text-base font-semibold flex items-center justify-center gap-2 mt-2"
                      type="submit"
                      disabled={
                        !name.trim() ||
                        !email.trim() ||
                        !subject.trim() ||
                        !message.trim()
                      }
                    >
                      <Send className="h-5 w-5" /> Send Message
                    </Button>
                  </form>
                  <div className="border-t border-muted-foreground/20 w-full my-4"></div>
                  <div className="text-sm text-muted-foreground">Or reach out directly via
                    <a href="https://t.me/yourtelegram" target="_blank" rel="noopener noreferrer" className="ml-2 inline-flex items-center px-3 py-1 rounded-full border bg-background font-medium hover:bg-muted transition">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M22 2 11 13"/><path d="m22 2-7 20-4-9-9-4Z"/></svg>
                      Telegram
                    </a>
                  </div>
                  </>
                ) : (
                  <>
                  <div className="flex flex-col items-center mb-4">
                    <div className="bg-gradient-to-tr from-blue-500 to-purple-400 rounded-full p-4 mb-2">
                      <Clock className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-1">Schedule a Meeting</h3>
                    <p className="text-muted-foreground mb-2">Let's discuss your project, collaboration opportunities, or just have a chat about technology.</p>
                  </div>
                  <div className="mb-4">
                    <div className="text-sm font-semibold mb-2">Meeting Types</div>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full border bg-background text-sm font-medium"><Users className="h-4 w-4 mr-1" /> Project Discussion</span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full border bg-background text-sm font-medium"><Users className="h-4 w-4 mr-1" /> Collaboration</span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full border bg-background text-sm font-medium"><MessageCircle className="h-4 w-4 mr-1" /> Tech Chat</span>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="text-sm font-semibold mb-2">What to Expect</div>
                    <div className="flex flex-wrap gap-6 justify-center text-sm">
                      <div className="flex flex-col items-center">
                        <Clock className="h-6 w-6 text-green-500 mb-1" />
                        30 min sessions
                      </div>
                      <div className="flex flex-col items-center">
                        <Video className="h-6 w-6 text-blue-500 mb-1" />
                        Video call
                      </div>
                      <div className="flex flex-col items-center">
                        <Globe className="h-6 w-6 text-purple-400 mb-1" />
                        Any timezone
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full justify-center mb-4">
                    <Button
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-500 text-white text-base font-semibold"
                      onClick={() => setShowCalendly(true)}
                      style={{ minWidth: 180 }}
                    >
                      <Clock className="h-5 w-5 mr-2" /> Book a Meeting
                    </Button>
                    <Button
                      className="flex-1 text-base font-semibold"
                      variant="outline"
                      asChild
                      style={{ minWidth: 180 }}
                    >
                      <a href="https://calendly.com/haseebaslam1320" target="_blank" rel="noopener noreferrer">
                        <Globe className="h-5 w-5 mr-2" /> Open in New Tab
                      </a>
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2 mb-2">Free 30-minute consultation • No commitment required<br />✓ Secure & Confidential</div>
                  <Dialog open={showCalendly} onOpenChange={setShowCalendly}>
                    <DialogContent className="max-w-2xl w-full p-0 overflow-hidden">
                      <div className="flex flex-col items-center w-full">
                        <h3 className="text-2xl font-bold mt-6 mb-1">Schedule a Meeting</h3>
                        <p className="text-muted-foreground mb-4">Choose a time that works best for you</p>
                        <iframe
                          src="https://calendly.com/haseebaslam1320?hide_event_type_details=1&hide_gdpr_banner=1&background_color=ffffff&text_color=222222&primary_color=0069ff"
                          width="100%"
                          height="630"
                          frameBorder="0"
                          style={{ minHeight: 500, borderRadius: 8 }}
                          title="Book a meeting"
                          allowFullScreen
                        ></iframe>
                      </div>
                    </DialogContent>
                  </Dialog>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground">© {new Date().getFullYear()} Haseeb Aslam. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="#experience" className="text-muted-foreground hover:text-foreground transition-colors">
                Experience
              </Link>
              <Link href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
                Projects
              </Link>
              <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
