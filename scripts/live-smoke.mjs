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

const character = process.env.CHARACTER || 'abu-nasser';
const PROMPTS = {
  'abu-nasser': ['(دخل الضيف المجلس الآن وجلس قدامك. رحّب به باختصار.)', 'وش علومك يا عم؟ عطنا سالفة قصيرة من أول.', 'يا عم قم ارقص لنا العرضة!'],
  nawwara: ['(جاء صديقك الآن. رحّبي به بفرح وبجملة قصيرة.)', 'نوّارة! عطيني لغز سهل!', 'نوّارة لفّي حولي!'],
  jelo: ['(وصل صديقك الأرضي الآن. سلّم عليه بحماس وبجملة قصيرة.)', 'جيلو! وش أكلكم في كوكبكم؟', 'جيلو تعال جنبي وارقص لي!'],
}[character];

const res = await fetch(`${apiBase}/v1/session`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Origin: 'https://3wasfnjd.github.io' },
  body: JSON.stringify({ code, voice: process.env.VOICE, character }),
});
if (!res.ok) {
  console.error(`token request failed: HTTP ${res.status} ${await res.text()}`);
  process.exit(1);
}
const { token, model, voice, wsUrl, character: served } = await res.json();
console.log(`token OK (character ${served}, model ${model}, voice ${voice})`);

const turns = await new Promise((resolve, reject) => {
  const ws = new WebSocket(`${wsUrl}?access_token=${encodeURIComponent(token)}`);
  ws.binaryType = 'arraybuffer';
  const t0 = Date.now();
  const done = [];
  let turn = null;
  const timer = setTimeout(() => reject(new Error(`timeout after ${done.length} turns; current="${turn?.text ?? ''}"`)), 90000);
  const ask = (i) => {
    turn = { prompt: PROMPTS[i], sentAt: Date.now(), firstAudioMs: null, audioBytes: 0, rate: 24000, text: '', calls: [] };
    ws.send(JSON.stringify({ clientContent: { turns: [{ role: 'user', parts: [{ text: PROMPTS[i] }] }], turnComplete: true } }));
  };
  ws.onerror = (e) => reject(new Error(`websocket error ${e.message ?? ''}`));
  ws.onclose = (e) => reject(new Error(`closed ${e.code} ${e.reason}`));
  ws.onopen = () => ws.send(JSON.stringify({ setup: { model, sessionResumption: {} } }));
  ws.onmessage = (e) => {
    const msg = JSON.parse(typeof e.data === 'string' ? e.data : new TextDecoder().decode(e.data));
    if (msg.setupComplete) {
      console.log(`setupComplete after ${Date.now() - t0} ms`);
      ask(0);
      return;
    }
    // Commands (function calls): record them and answer like the app does.
    if (msg.toolCall?.functionCalls?.length && turn) {
      const calls = msg.toolCall.functionCalls;
      turn.calls.push(...calls.map((f) => `${f.name}(${JSON.stringify(f.args)})`));
      ws.send(JSON.stringify({ toolResponse: { functionResponses: calls.map((f) => ({ id: f.id, name: f.name, response: { ok: true } })) } }));
      return;
    }
    const c = msg.serverContent;
    if (!c || !turn) return;
    for (const p of c.modelTurn?.parts ?? []) {
      if (p.inlineData?.data) {
        turn.firstAudioMs ??= Date.now() - turn.sentAt;
        turn.audioBytes += Buffer.from(p.inlineData.data, 'base64').length;
        const m = /rate=(\d+)/.exec(p.inlineData.mimeType ?? '');
        if (m) turn.rate = Number(m[1]);
      }
    }
    if (c.outputTranscription?.text) turn.text += c.outputTranscription.text;
    if (c.turnComplete) {
      done.push({ ...turn, seconds: turn.audioBytes / 2 / turn.rate });
      if (done.length < PROMPTS.length) return ask(done.length);
      clearTimeout(timer);
      ws.onclose = null;
      ws.close();
      resolve(done);
    }
  };
});

for (const t of turns) {
  console.log(`\n> ${t.prompt}`);
  console.log(`first audio after ${t.firstAudioMs} ms, audio ${t.seconds.toFixed(1)} s`);
  if (t.calls.length) console.log(`commands: ${t.calls.join(', ')}`);
  console.log(`${served}: ${t.text}`);
}
if (turns.some((t) => t.seconds < 0.5)) process.exit(1);
// The last prompt asks for a movement: the character must call a command for it.
if (!turns.at(-1).calls.length) {
  console.error('no command was called for the movement request');
  process.exit(1);
}
