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
        user: "lucas.zanini@ejemmackenzie.com.br",
        pass: "xrec jxgc xniu ihlx", // Recomenda-se usar App Passwords para Gmail
      },
    });
    

    transporter.verify(function (error, success) {
      if (error) {
        console.error("Erro ao verificar transporte:", error);
      } else {
        console.log("Transporte pronto para enviar e-mails!");
      }
    });

    const mailOptions = {
      from: email,
      to: "proengejem@gmail.com", // Endereço de destino
      subject: "Novo formulário submetido",
      text: `Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Erro ao enviar e-mail:", error);
        return res.status(500).json({ error: "Erro ao enviar e-mail" });
      } else {
        console.log("Email enviado:", info.response);
        return res.status(200).json({ message: "Email enviado com sucesso" });
      }
    });
  }
}