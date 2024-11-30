const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.post('/proxy', async (req, res) => {
    try {
        const response = await axios.post('https://ssk.jkt48.com/2024/api/serial-validate', req.body,
            {
                headers: {
                    'accept-language': 'en-US,en;q=0.9,id;q=0.8',
                    'origin': 'https://ssk.jkt48.com',
                    'priority': 'u=1, i',
                    'referer': 'https://ssk.jkt48.com/2024/id/vote',
                    'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Microsoft Edge";v="128"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0'
                },
            });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan', details: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
