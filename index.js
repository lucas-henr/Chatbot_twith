import { Client } from "tmi.js"
import "dotenv/config.js"

// Crie um arquivo `.env` com o BOTNAME e BOTPASS
const client = new Client({
    identity: {
         username: process.env.BOTNAME,
         password: process.env.BOTPASS
    },
	//dentro do .env coloque o Nome do seu canal dentro de `CHANNELS`
    channels: process.env.CHANNELS.split(",").map(chan=>chan.trim()),
    connection: {
        reconnect: true
    }
})

client.connect()

client.on("connected", (addr, port) => {
    console.log(`Chatbot conectado com sucesso: ${addr} ${port}`)
})

client.on("join", (channel, username, self) => {
    if (self) console.log(`Entrando no canal ${channel}`)
})

client.on("chat", (channel, tags, message, self) => {
    // quando entrar vai sar nisso
     if (self) return 
     console.log(` ${channel}: ${tags["display-name"]}: ${message}`)
     //comandos (para adicionar outro comando é só usar esse mesmo estilo)
	 if (message === "comando") return client.say(channel, "resposta") // exemplo abaixo
     if (message === "$dcbot") return client.say(channel, "Faça parte do servidor de suporte do nosso bot do discord: https://discord.green/lucasbot")
})