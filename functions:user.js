// Netlify usa Node 18+, então fetch já existe nativamente.
export async function handler() {
  const API_KEY = process.env.ELEVENLABS_API_KEY;
  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'ELEVENLABS_API_KEY não configurada' })
    };
  }

  try {
    const resp = await fetch('https://api.elevenlabs.io/v1/user', {
      headers: {
        'accept': 'application/json',
        'xi-api-key': API_KEY
      }
    });
    const body = await resp.text();  // mantém string em caso de erro HTML
    return { statusCode: resp.status, body };
  } catch (err) {
    return { statusCode: 502, body: JSON.stringify({ error: err.message }) };
  }
}
