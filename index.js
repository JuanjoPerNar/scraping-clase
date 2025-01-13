const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()

const PORT = 3000

const url = 'https://carlosdiazgirol.github.io/dashboard/'

app.get('/', (req, res) => {
    axios.get(url).then((response) => {
        if(response.status === 200) {
            const html = response.data
            const $ = cheerio.load(html)
            
            const pageTitle = $('title').text()
            
            const links = []
            const imgs = []

            $('a').each((index, element) => {
                const link = $(element).attr('href')
                links.push(link)
            })

            $('img').each((index, element) => {
                const img = $(element).attr('src')
                imgs.push(img)
            })            
            
            res.send(`
                <h1>${pageTitle}</h1>
                <h2>Enlaces</h2>
                <ul>
                    ${links.map(link => `<li><a href="${url}${link}">${link}</a></li>`).join('')}
                </ul>
                <h2>Imágenes</h2>
                <ul>
                    ${imgs.map(img => `<li><a href="${url}${img}">${img}</a></li>`).join('')}
                </ul>
                `)
        }
    })
})

app.listen(PORT, () => {
    console.log(`El servidor se está ejecutando en http://localhost:${PORT}`);
});