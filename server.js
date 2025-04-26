const http = require('http');
const fs = require('fs');
const path = require('path');


const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        if (req.url === '/') {
            fs.readFile(
                path.join(__dirname, 'src', 'views', 'home', 'index.html'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        throw err
                    }
                    res.end(content)
                }
            )
        }
        if (req.url === '/about') {
            fs.readFile(
                path.join(__dirname, 'src', 'views', 'about', 'index.html'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        throw err
                    }
                    res.end(content)
                }
            )
        }

    }
    else if (req.method === 'POST') {
        const body = [];
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        })
        req.on('data', data => {
            body.push(Buffer.from(data))
        })
        req.on('end', () => {
            const mess = body.toString().split('=')[1]
            res.end(`<h1>Your message:${mess}</h1>`)
        })
    }
})

server.listen(3000, () => console.log('server run'))