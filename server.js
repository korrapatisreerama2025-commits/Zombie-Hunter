const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const filePath = path.join(__dirname, 'index.html');

const server = http.createServer((req, res) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error loading index.html: ' + err.message);
            return;
        }
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-cache'
        });
        res.end(data);
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Zombie Apocalypse Survival Shooter is live at: http://localhost:${PORT}/`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        const nextPort = Number(PORT) + 1;
        console.log(`Port ${PORT} in use, trying port ${nextPort}...`);
        server.listen(nextPort, '0.0.0.0');
    } else {
        console.error('Server error:', err);
    }
});

