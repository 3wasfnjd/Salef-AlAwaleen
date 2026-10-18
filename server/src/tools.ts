/**
 * Commands a character can carry out in the player's world (Gemini Live
 * function calling). They are locked into the session setup with everything
 * else, and the app executes them on the 3D character and answers with
 * { ok, note }. Keep the names and enums in sync with src/core/commands.ts
 * (a unit test checks).
 */
export const CHARACTER_TOOLS = [
  {
    name: 'move',
    description:
      "Move the character relative to the player. come: come and stand in front of the player. stay: stop following and wait where you are. follow: walk / fly along with the player again. circle: go once around the player.",
    parameters: {
      type: 'OBJECT',
      properties: { action: { type: 'STRING', enum: ['come', 'stay', 'follow', 'circle'] } },
      required: ['action'],
    },
  },
  {
    name: 'pose',
    description: 'Sit down or stand up.',
    parameters: {
      type: 'OBJECT',
      properties: { pose: { type: 'STRING', enum: ['sit', 'stand'] } },
      required: ['pose'],
    },
  },
  {
    name: 'gesture',
    description: 'Play a body gesture: wave hello, celebrate, dance, or spin around.',
    parameters: {
      type: 'OBJECT',
      properties: { gesture: { type: 'STRING', enum: ['wave', 'celebrate', 'dance', 'spin'] } },
      required: ['gesture'],
    },
  },
  {
    name: 'celebration',
    description: 'Launch a celebration effect around the character: soap bubbles, fireworks, water splashes or confetti.',
    parameters: {
      type: 'OBJECT',
      properties: { kind: { type: 'STRING', enum: ['bubble', 'firework', 'water', 'confetti'] } },
      required: ['kind'],
    },
  },
  {
    name: 'change_place',
    description: 'Move the scene to another place: the majlis (sitting room), the fereej (old neighbourhood) or the barr (desert camp).',
    parameters: {
      type: 'OBJECT',
      properties: { place: { type: 'STRING', enum: ['majlis', 'fereej', 'barr'] } },
      required: ['place'],
    },
  },
] as const;

/** Appended to every persona so each character uses the commands the same way. */
export const COMMANDS_GUIDE = `

## الأوامر والحركة
- عندك أدوات تتحرك فيها في عالم صديقك: move (تعال، انتظر، امش معي، لف حولي)، pose (اقعد، قوم)، gesture (لوّح، احتفل، ارقص، لف)، celebration (فقاعات، ألعاب نارية، ماء، قصاصات)، change_place (المجلس، الفريج، البر).
- إذا طلب منك صديقك حركة بأي صيغة، استدعِ الأداة المناسبة فورًا وبدون ما تسأل، وبعد ما ترجع النتيجة علّق بجملة قصيرة.
- إذا رجعت النتيجة ok: false، قل بلطف إنك ما تقدر هالحين، واذكر السبب من note بكلامك.
- لا تقول إنك سويت الحركة قبل ما ترجع النتيجة.
- تقدر تستخدم gesture أو celebration من نفسك أحيانًا للفرحة، مثل إذا جاوب صديقك صح، بس لا تكثر.`;
