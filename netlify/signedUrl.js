// Gera um signed‑url para o widget sem expor a API‑key.
// Requer as variáveis de ambiente ELEVENLABS_API_KEY e AGENT_ID.

export async function handler() {
  const API_KEY  = process.env.ELEVENLABS_API_KEY;
  const AGENT_ID = process.env.AGENT_ID;                 // agent_01k033mq6bft48x7jvwjv91ada

  if (!API_KEY || !AGENT_ID)
    return { statusCode: 500, body: JSON.stringify({ error: 'vars missing' }) };

  const url = `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${AGENT_ID}`;

  try {
    const resp = await fetch(url, { headers: { 'xi-api-key': API_KEY } });
    if (!resp.ok)
      return { statusCode: resp.status, body: await resp.text() };

    const { signed_url } = await resp.json();
    return { statusCode: 200, body: JSON.stringify({ signedUrl: signed_url }) };
  } catch (err) {
    return { statusCode: 502, body: JSON.stringify({ error: err.message }) };
  }
}
