export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { model, message } = req.body || {};
  if (!message) return res.status(400).json({ error: 'Missing message' });

  let reply = '';

  try {
    if (model === 'gemini') reply = await callGemini(message);
    else if (model === 'copilot') reply = await callCopilot(message);
    else reply = await callGroq(message);

    res.status(200).json({ reply });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

// STUBS — replace with real API calls later
async function callGemini(msg) {
  return `Gemini (stub): ${msg}`;
}

async function callCopilot(msg) {
  return `Copilot (stub): ${msg}`;
}

async function callGroq(msg) {
  return `Groq (stub): ${msg}`;
}
