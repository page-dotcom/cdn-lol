export default async function handler(req, res) {
    // Wajib: Izin CORS biar localhost lu bisa narik data dari sini
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight request dari browser
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Tarik API Key dari settingan Vercel
    const API_KEY = process.env.NEWS_API_KEY; 
    
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=4&apiKey=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Gagal mengambil berita' });
    }
}
