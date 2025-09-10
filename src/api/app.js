import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/lead", async (req, res) => {
  try {
    const { nome, email, empresa, whatsapp, mensagem, ...utm } = req.body;
    if (!nome || !email)
      return res.status(422).send("Campos obrigatórios ausentes");

    // TODO: envie para e-mail/Kommo/Zapier aqui:
    // await fetch('https://SEU_WEBHOOK_PRIVADO', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ nome, email, empresa, whatsapp, mensagem, utm }),
    // })

    return res.status(200).send("OK");
  } catch {
    return res.status(500).send("Erro no servidor");
  }
});

if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3000;
  app.listen(port, () =>
    console.log(`API running on http://localhost:${port}`)
  );
}

export default app;
