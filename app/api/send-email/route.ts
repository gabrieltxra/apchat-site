import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { subject, email, message, formType, planData } = body

    // Configure o transporter do nodemailer
    // Nota: Em produção, você deve usar variáveis de ambiente para estas credenciais
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Substitua pelo seu servidor SMTP
      port: 465,
      secure: true, // true para 465, false para outras portas
      auth: {
        user: "", // Substitua pelo seu email
        pass: "", // Substitua pela sua senha ou app password
      },
    })

    let emailContent = ""
    let emailSubject = ""

    // Formatar o conteúdo do email com base no tipo de formulário
    if (formType === "contact") {
      emailSubject = subject || "Novo contato do site APChat"
      emailContent = `
        <h2>Novo contato recebido</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong> ${message}</p>
      `
    } else if (formType === "plan") {
      emailSubject = `Novo interesse - Plano ${planData.plan}`
      emailContent = `
        <h2>Novo interesse em plano</h2>
        <p><strong>Plano:</strong> ${planData.plan}</p>
        <p><strong>CNPJ:</strong> ${planData.cnpj}</p>
        <p><strong>Responsável:</strong> ${planData.responsible}</p>
        <p><strong>Telefone:</strong> ${planData.phone}</p>
        <p><strong>Email:</strong> ${planData.email}</p>
      `
    }

    // Configuração do email
    const mailOptions = {
      from: "togashiyuuta88@gmail.com", // Substitua pelo seu email
      to: "ramundugamerhd@gmail.com", // Email de destino
      subject: emailSubject,
      html: emailContent,
    }

    // Enviar o email
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true, message: "Email enviado com sucesso!" })
  } catch (error) {
    console.error("Erro ao enviar email:", error)
    return NextResponse.json(
      { success: false, message: "Falha ao enviar email", error: (error as Error).message },
      { status: 500 },
    )
  }
}

