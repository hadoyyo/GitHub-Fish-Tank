const { checkRateLimit } = require('../lib/github');

export default async function handler(req, res) {
  try {
    const limit = await checkRateLimit();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache');
    res.json(limit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}