import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

// Define os tipos para o corpo da requisição
interface EmailRequestBody {
  name: string;
  email: string;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, message } = req.body as EmailRequestBody;

    // Validação básica dos dados recebidos
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail", // Você pode mudar para o provedor que estiver usando
      auth: {
        user: "proengejem@gmail.com",
        pass: "proenggeotecnia123", // Recomenda-se usar App Passwords para Gmail
      },
    });

    const mailOptions = {
      from: email,
      to: "proengejem@gmail.com", // Endereço de destino
      subject: "Novo formulário submetido",
      text: `Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`,
    };

    try {
      console.log("Enviando email...");
      await transporter.sendMail(mailOptions);
      console.log("Email enviado com sucesso!");
      res.status(200).json({ message: "Email enviado com sucesso!" });
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      res.status(500).json({ error: "Erro ao enviar email" });
    }
  } else {
    console.error("Método HTTP inválido:", req.method);
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: "Método não permitido" });
  }
}