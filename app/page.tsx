"use client"

import type React from "react"

import {
  Mail,
  MessageSquare,
  Calendar,
  Users,
  Tags,
  Video,
  Database,
  Phone,
  Menu,
  X,
  ChevronRight,
  Star,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ContactFormModal from "./contact-form-modal"
import WhatsAppButton from "./whatsapp-button"

export default function Home() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: "contact",
          email,
          message,
          subject: "Contato APChat",
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitStatus("success")
        // Limpar o formulário após envio bem-sucedido
        setEmail("")
        setMessage("")

        // Resetar o status após 5 segundos
        setTimeout(() => {
          setSubmitStatus("idle")
        }, 5000)
      } else {
        setSubmitStatus("error")
        setErrorMessage(data.message || "Ocorreu um erro ao enviar o formulário.")
      }
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage("Ocorreu um erro ao enviar o formulário. Tente novamente mais tarde.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const openPlanModal = (planName: string) => {
    setSelectedPlan(planName)
    setIsModalOpen(true)
  }

  const features = [
    {
      icon: <MessageSquare className="h-8 w-8 text-blue-600" />,
      title: "Chatbot Inteligente",
      description:
        "Configure seu chatbot por setor para respostas rápidas e personalizadas. Utilize IA avançada para melhorar a experiência do cliente.",
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Atendimento Multisetorial",
      description: "Adicione múltiplos atendentes e setores específicos para um atendimento organizado e eficiente.",
    },
    {
      icon: <Calendar className="h-8 w-8 text-blue-600" />,
      title: "Agendamento Inteligente",
      description:
        "Envie mensagens agendadas para contatos de forma prática e automatizada. Programe campanhas e lembretes.",
    },
    {
      icon: <Phone className="h-8 w-8 text-blue-600" />,
      title: "Conexões Unificadas",
      description:
        "Gerencie todas as interações a partir de um único número de WhatsApp, com opção de expansão conforme necessário.",
    },
    {
      icon: <Database className="h-8 w-8 text-blue-600" />,
      title: "Gestão de Leads",
      description:
        "Salvamento automático de números que entram em contato para gerenciamento eficiente de leads e oportunidades.",
    },
    {
      icon: <Mail className="h-8 w-8 text-blue-600" />,
      title: "Mensagens Rápidas",
      description:
        "Crie atalhos para mensagens frequentes e envie respostas rápidas com facilidade. Aumente a produtividade da equipe.",
    },
    {
      icon: <Tags className="h-8 w-8 text-blue-600" />,
      title: "Sistema de Tags",
      description:
        "Utilize tags para categorizar e gerenciar atendimentos de forma eficiente. Organize e acompanhe o progresso.",
    },
    {
      icon: <Video className="h-8 w-8 text-blue-600" />,
      title: "Treinamento em Vídeo",
      description: "Video aulas completas sobre o uso da ferramenta, com tutoriais detalhadas e dicas avançadas.",
    },
  ]

  const benefits = [
    {
      title: "Aumente suas vendas",
      description: "Automatize o processo de vendas e aumente sua taxa de conversão",
      icon: <Star className="h-6 w-6 text-yellow-400" />,
    },
    {
      title: "Reduza custos",
      description: "Diminua custos operacionais com atendimento automatizado",
      icon: <CheckCircle2 className="h-6 w-6 text-green-500" />,
    },
    {
      title: "Melhore a satisfação",
      description: "Ofereça atendimento 24/7 e aumente a satisfação dos clientes",
      icon: <Users className="h-6 w-6 text-blue-500" />,
    },
  ]

  const plans = [
    {
      name: "Basic",
      price: "R$ 100/mês",
      features: ["1 número de WhatsApp", "Até 15 usuários", "Chatbot básico", "Suporte Full Time + Treinamento"],
    },
    {
      name: "Standard",
      price: "R$ 250/mês",
      features: [
        "10 números de WhatsApp",
        "Até 100 usuários simultâneos",
        "Suporte prioritário",
        "Suporte Full Time + Treinamento",
      ],
      popular: true,
    },
    {
      name: "Premium",
      price: "R$ 500/mês",
      features: [
        "Números Ilimitados",
        "Usuários Ilimitados",
        "Chatbot personalizado",
        "Suporte Full Time + Treinamento",
      ],
    },
  ]

  return (
    <div className="min-h-screen">
      {/* navbar dekstop */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-lg" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                APChat
              </span>
            </motion.div>

            {/* navegacao desktop */}
            <div className="hidden md:flex items-center space-x-8">
              {["Início", "Funcionalidades", "Planos", "Contato"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`${
                    scrolled ? "text-gray-800" : "text-white"
                  } hover:text-blue-500 transition-colors duration-300 text-sm font-medium`}
                >
                  {item}
                </a>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-semibold transition duration-300"
              >
                Começar Agora
              </motion.button>
            </div>

            {/* navbar botao */}
            <button className="md:hidden text-blue-600" onClick={() => setIsNavOpen(!isNavOpen)}>
              {isNavOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* navbar para mobile */}
        <motion.div
          initial={false}
          animate={isNavOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          className="md:hidden overflow-hidden bg-white"
        >
          <div className="px-4 py-2 space-y-1">
            {["Início", "Funcionalidades", "Planos", "Contato"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block px-3 py-2 text-gray-800 hover:text-blue-500 transition-colors duration-300"
                onClick={() => setIsNavOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      </nav>

      {/* hero */}
      <div id="início" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-600/90 backdrop-blur-sm"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Revolucione seu <span className="text-blue-400">atendimento</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl">
              Automatize seu atendimento com inteligência artificial e transforme a experiência dos seus clientes.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  openPlanModal("Standard")
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition duration-300"
              >
                Comece Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.a>
              <motion.a
                href="#funcionalidades"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold transition duration-300 backdrop-blur-sm"
              >
                Saiba Mais
                <ChevronRight className="ml-2 h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block"
          >
            <img
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl"
            />
          </motion.div>
        </div>

        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <a href="#funcionalidades" className="text-white opacity-80 hover:opacity-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* cor */}
      <div className="py-20 bg-gradient-to-b from-blue-900 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl"
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-blue-200">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* funcionalidades do apchat */}
      <div id="funcionalidades" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Funcionalidades Poderosas</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tudo que você precisa para automatizar e melhorar seu atendimento em uma única plataforma.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100"
              >
                <div className="mb-4 bg-blue-50 p-3 rounded-lg inline-block">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* preço valores etc*/}
      <div id="planos" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Planos para Todos os Tamanhos</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Escolha o plano ideal para o seu negócio e comece a transformar seu atendimento hoje mesmo.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`bg-white p-8 rounded-xl shadow-lg relative ${
                  plan.popular ? "border-2 border-blue-500" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                    Mais Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold text-blue-600 mb-6">{plan.price}</p>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-600">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  onClick={() => openPlanModal(plan.name)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-lg font-semibold transition duration-300 ${
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                  }`}
                >
                  Começar Agora
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* contato */}
      <div id="contato" className="py-24 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold text-gray-900">Vamos Conversar?</h2>
              <p className="text-xl text-gray-600">
                Entre em contato conosco e descubra como o APChat pode transformar seu atendimento.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-blue-600" />
                  <span className="text-gray-600">contato@aptechinfo.com.br</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-blue-600" />
                  <span className="text-gray-600">+55 (11) 99999-9999</span>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
                {submitStatus === "success" && (
                  <div className="bg-green-100 text-green-700 p-4 rounded-lg">
                    <p className="font-medium">Mensagem enviada com sucesso!</p>
                    <p className="text-sm mt-1">Entraremos em contato em breve.</p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="bg-red-100 text-red-700 p-4 rounded-lg">
                    <p className="font-medium">Erro ao enviar mensagem</p>
                    <p className="text-sm mt-1">{errorMessage}</p>
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="seu@email.com"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="Como podemos ajudar?"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`w-full px-6 py-3 rounded-lg font-semibold transition duration-300 flex items-center justify-center space-x-2 ${
                    isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <span>Enviar Mensagem</span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* rodapé */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">APChat</span>
              </div>
              <p className="text-blue-200">Transformando o atendimento ao cliente.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Produto</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#funcionalidades" className="text-blue-200 hover:text-white transition">
                    Funcionalidades
                  </a>
                </li>
                <li>
                  <a href="#planos" className="text-blue-200 hover:text-white transition">
                    Planos
                  </a>
                </li>
                <li>
                  <a href="#contato" className="text-blue-200 hover:text-white transition">
                    Contato
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-12 pt-8 text-center">
            <p className="text-blue-200">© 2024 APChat | APTech. Feito por Gabriel Teixeira</p>
          </div>
        </div>
      </footer>

      {/* Modal Form */}
      <ContactFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} selectedPlan={selectedPlan} />

      {/* WhatsApp Button */}
      <WhatsAppButton phoneNumber="5511999999999" />
    </div>
  )
}

