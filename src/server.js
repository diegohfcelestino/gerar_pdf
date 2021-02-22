const express = require('express')
const ejs = require('ejs')
const path = require('path')
//const pdf = require('html-pdf') aqui só precisa quando não tem o puppeteer
const puppeteer = require('puppeteer') //primeiro tem que instalar com o comando "npm install puppeteer" no terminal
const app = express()

const passengers = [
    {
        name: "Diego",
        flightNumber: 7859,
        time: "18h00",
    },
    {
        name: "Patricia",
        flightNumber: 7859,
        time: "18h00",
    },
    {
        name: "Douglas",
        flightNumber: 7859,
        time: "18h00",
    },
    {
        name: "Gabriel",
        flightNumber: 7859,
        time: "18h00",
    },
    {
        name: "Lara",
        flightNumber: 7859,
        time: "18h00",
    },
    {
        name: "Eric",
        flightNumber: 7859,
        time: "18h00",
    },
];

app.get('/pdf', async(request, response) => {

    const browser = await puppeteer.launch() //iniciar o puppeteer
    const page = await browser.newPage() // iniciar uma página

    await page.goto('http://localhost:3000/', {
        waitUntil: 'networkidle0'
    })

    const pdf = await page.pdf({
        printBackground: true,
        format: 'Letter'
    }) // configurar e gerar o PDF

    await browser.close() //fechar o navegador

    response.contentType("application/pdf")

    return response.send(pdf)

})


app.get('/', (request, response) => {

    const filePath = path.join(__dirname, "print.ejs")
    ejs.renderFile(filePath, { passengers }, (err, html) => {
        if(err) {
            return response.send('Erro na leitura do arquivo')
        }

         /* const options = {
            height: "11.25in",
            width: "8.5in",
            header: {
                height: "20mm"
            },
            footer: {
                height: "20mm"
            }
        } 

        //Aqui criamos o pdf
        pdf.create(html, options).toFile("report.pdf", (err, data) => {
            if (err) {
                return response.send("Erro ao gerar o PDF")
            }

            *** Todo este bloco foi usado quando não havia o puppeteer*/



    
        
        return response.send(html) // enviar para o navegador
    })
})

  
      

app.listen(3000)