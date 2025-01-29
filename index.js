const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const https = require('https');
const fs = require('fs');

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Load SSL certificate and key
const options = {
    key: fs.readFileSync(path.join(__dirname, 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'server.cert'))
};

// Serve HTML file for Apple Pay button
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start HTTPS server
https.createServer(options, app).listen(port, () => {
    console.log(`HTTPS Server running at https://localhost:${port}/`);
});
