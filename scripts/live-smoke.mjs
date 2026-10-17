// Real end-to-end check against Gemini Live through our token server.
// Usage: API_BASE=https://… ACCESS_CODE=… node scripts/live-smoke.mjs
// Prints the elder's greeting transcript, audio length and latency. Uses a
// little of the free quota; run from CI after deploys, not in a loop.
const apiBase = process.env.API_BASE;
const code = process.env.ACCESS_CODE;
if (!apiBase || !code) {
  console.error('API_BASE and ACCESS_CODE are required');
  process.exit(2);
}

const res = await fetch(`${apiBase}/v1/session`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Origin: 'https://3wasfnjd.github.io' },
  body: JSON.stringify({ code }),
});
if (!res.ok) {
  console.error(`token request failed: HTTP ${res.status} ${await res.text()}`);
  process.exit(1);
}
const { token, model, wsUrl } = await res.json();
console.log(`token OK (model ${model})`);

const result = await new Promise((resolve, reject) => {
  const ws = new WebSocket(`${wsUrl}?access_token=${encodeURIComponent(token)}`);
  ws.binaryType = 'arraybuffer';
  const t0 = Date.now();
  let sentAt = 0;
  let firstAudioMs = null;
  let audioBytes = 0;
  let rate = 24000;
  let text = '';
  const timer = setTimeout(() => reject(new Error(`timeout; got ${audioBytes} audio bytes, text="${text}"`)), 45000);
  ws.onerror = (e) => reject(new Error(`websocket error ${e.message ?? ''}`));
  ws.onclose = (e) => reject(new Error(`closed ${e.code} ${e.reason}`));
  ws.onopen = () => ws.send(JSON.stringify({ setup: { model, sessionResumption: {} } }));
  ws.onmessage = (e) => {
    const msg = JSON.parse(typeof e.data === 'string' ? e.data : new TextDecoder().decode(e.data));
    if (msg.setupComplete) {
      console.log(`setupComplete after ${Date.now() - t0} ms`);
      sentAt = Date.now();
      ws.send(JSON.stringify({
        clientContent: { turns: [{ role: 'user', parts: [{ text: '(دخل الضيف المجلس الآن وجلس قدامك. رحّب به باختصار.)' }] }], turnComplete: true },
      }));
      return;
    }
    const c = msg.serverContent;
    if (!c) return;
    for (const p of c.modelTurn?.parts ?? []) {
      if (p.inlineData?.data) {
        firstAudioMs ??= Date.now() - sentAt;
        audioBytes += Buffer.from(p.inlineData.data, 'base64').length;
        const m = /rate=(\d+)/.exec(p.inlineData.mimeType ?? '');
        if (m) rate = Number(m[1]);
      }
    }
    if (c.outputTranscription?.text) text += c.outputTranscription.text;
    if (c.turnComplete) {
      clearTimeout(timer);
      ws.onclose = null;
      ws.close();
      resolve({ firstAudioMs, seconds: audioBytes / 2 / rate, text });
    }
  };
});

console.log(`first audio after ${result.firstAudioMs} ms`);
console.log(`audio: ${result.seconds.toFixed(1)} s`);
console.log(`transcript: ${result.text}`);
if (result.seconds < 0.5) process.exit(1);
